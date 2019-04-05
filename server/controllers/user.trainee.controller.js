const User = require("../models/user/user");
const Clock = require("../models/clock");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const differenceInSeconds = require("date-fns/difference_in_seconds");
const differenceInMinutes = require("date-fns/difference_in_minutes");
const checkIfOvertime = require("../utils/checkIfOvertime");

const ActivityUtils = require("./utils/activity");
const UserUtils = require("./utils/user");

/**
 * Test route
 * GET api/users/trainee/test
 * @param  req
 * @param  res
 * @private
 */
function testRoute(req, res) {
  res.status(200).json({ message: "Users Trainee test." });
}

function initializeUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  let globalUser;

  User.findById(req.user._id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.middleName = req.body.middleName;
      user.lastName = req.body.lastName;
      user.nickname = req.body.nickname;
      user.gender = req.body.gender;
      user.email = req.body.email;
      user.profilePictureUrl = req.body.profilePictureUrl;

      user.roleData.school = req.body.school;
      user.roleData.dateOfBirth = req.body.dateOfBirth;
      user.roleData.address = req.body.address;
      user.roleData.contactNumber = req.body.contactNumber;
      user.roleData.adviserName = req.body.adviserName;
      user.roleData.adviserContactNumber = req.body.adviserContactNumber;
      user.roleData.guardianName = req.body.guardianName;
      user.roleData.guardianContactNumber = req.body.guardianContactNumber;

      user.roleData.isInitialized = true;

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          user.password = hash;
          user
            .save()
            .then(user => {
              globalUser = user;

              return ActivityUtils.logActivity(user._id, "initialize");
            })
            .then(() => {
              res
                .status(200)
                .json({ message: "Initialized successfully.", globalUser });
            })
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => res.status(500).send(err));
}

/**
 * Clock in/out
 * POST api/users/trainee/clock
 */
function userClock(req, res) {
  let lastClockId;
  let globalUser;
  let globalClock;

  User.findById(req.user._id)
    .select("+roleData.clocks")
    .then(user => {
      globalUser = user;
      lastClockId = user.roleData.clocks[user.roleData.clocks.length - 1];

      return Clock.findById(lastClockId);
    })
    .then(clock => {
      globalClock = clock;

      // >>> If no clocks or not clocked in --> Clock in
      if (!clock || globalUser.roleData.isClockedIn === false) {
        const newClock = new Clock({
          user: globalUser._id
        });

        newClock
          .save()
          .then(clock => {
            globalClock = clock;

            globalUser.roleData.isClockedIn = true;
            globalUser.roleData.clocks.push(clock);

            return globalUser.save();
          })
          .then(user => {
            globalUser = user;

            return ActivityUtils.logActivity(user._id, "clockIn", globalClock);
          })
          .then(() => {
            return UserUtils.returnTrainee(globalUser._id);
          })
          .then(user => {
            res.status(200).json({ message: "Clocked in successfully.", user });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({ message: "An error occurred.", err });
          });
      }

      // >>> If user is clocked in but time clocked out is less than 15 minutes then disregard and delete recent clock
      else if (
        globalUser.roleData.isClockedIn &&
        differenceInMinutes(new Date(), clock.in) < 15
      ) {
        clock
          .remove()
          .then(clock => {
            globalClock = clock;

            globalUser.roleData.clocks.remove(lastClockId);
            globalUser.roleData.isClockedIn = false;
            return globalUser.save();
          })
          .then(user => {
            globalUser = user;

            return ActivityUtils.deleteActivityByClockId(globalClock._id);
          })
          .then(() => {
            return UserUtils.returnTrainee(globalUser._id);
          })
          .then(user => {
            res.status(200).json({
              message:
                "Clocked out. Clocks less than 15 minutes are discarded.",
              user
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({ message: "An error occurred.", err });
          });
      }

      // >>> Last clock is not yet clocked out --> Clock out
      else if (clock.out !== null) {
        const secondsElapsed = differenceInSeconds(new Date(), clock.in);
        clock.out = Date.now();

        // >>> If seconds elapsed is greater than 12 hours and 15 minutes, set clock as invalid.
        if (secondsElapsed > 44100) {
          clock.isInvalid = true;
        } else if (checkIfOvertime(globalUser.roleData.schedule)) {
          clock.isOvertime = true;
          clock.overtimeReason = req.body.overtimeReason;
        }

        clock
          .save()
          .then(clock => {
            globalClock = clock;

            globalUser.roleData.timeRendered += secondsElapsed;

            // >>> Check if finished or not
            if (
              globalUser.roleData.timeRendered >=
              globalUser.roleData.trainingDuration
            ) {
              globalUser.roleData.isFinished = true;
            } else {
              globalUser.roleData.isFinished = false;
            }

            globalUser.roleData.isClockedIn = false;
            return globalUser.save();
          })
          .then(user => {
            globalUser = user;

            return ActivityUtils.logActivity(
              user._id,
              "clockOut",
              globalClock._id
            );
          })
          .then(() => {
            return UserUtils.returnTrainee(globalUser._id);
          })
          .then(user => {
            res
              .status(200)
              .json({ message: "Clocked out successfully.", user });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({ message: "An error occurred.", err });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "An error occurred.", err });
    });
}

/**
 * Submit clock correction request
 * POST api/users/trainee/clock-correction
 * @param req.body.in
 * @param req.body.out
 * @param req.body.clockId
 */
function requestClockCorrection(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findById(req.user._id).then(user => {
    user.roleData.clockCorrectionRequest.isActive = true;
    user.roleData.clockCorrectionRequest.in = req.body.in;
    user.roleData.clockCorrectionRequest.out = req.body.out;
    user.roleData.clockCorrectionRequest.clockId = req.body.clockId;

    user.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).json(user);
    });
  });
}

/**
 * Cancel clock correction request
 * POST api/users/trainee/cancel-clock-correction
 */
function cancelClockCorrection(req, res) {
  User.findById(req.user._id).then(user => {
    user.roleData.clockCorrectionRequest.isActive = false;
    user.roleData.clockCorrectionRequest.in = null;
    user.roleData.clockCorrectionRequest.out = null;
    user.roleData.clockCorrectionRequest.clockId = null;

    user.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).json(user);
    });
  });
}

/**
 * Approve clock correction request (Administrator)
 * POST api/users/trainee/approve-clock-correction
 * @param req.body.userId
 */
function approveClockCorrection(req, res) {
  let globalUser;

  User.findById(req.body.userId)
    .then(user => {
      globalUser = user;
      return Clock.findById(user.roleData.clockCorrectionRequest.clockId);
    })
    .then(clock => {
      clock.in = globalUser.roleData.clockCorrectionRequest.in;
      clock.out = globalUser.roleData.clockCorrectionRequest.out;
      clock.isInvalid = false;

      globalUser.roleData.clockCorrectionRequest.isActive = false;
      globalUser.roleData.clockCorrectionRequest.in = null;
      globalUser.roleData.clockCorrectionRequest.out = null;
      globalUser.roleData.clockCorrectionRequest.clockId = null;

      return Promise.all([clock.save(), globalUser.save()]);
    })
    .then(([clock, user]) => {
      res
        .status(200)
        .send({ message: "Approve clock correction success.", clock, user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}

/**
 * Reject clock correction request (Administrator)
 * POST api/users/trainee/reject-clock-correction
 * @param req.body.userId
 */
function rejectClockCorrection(req, res) {
  User.findById(req.body.userId).then(user => {
    user.roleData.clockCorrectionRequest.isActive = false;
    user.roleData.clockCorrectionRequest.in = null;
    user.roleData.clockCorrectionRequest.out = null;
    user.roleData.clockCorrectionRequest.clockId = null;

    user.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).json(user);
    });
  });
}

module.exports = {
  testRoute,
  initializeUser,
  userClock,
  requestClockCorrection,
  cancelClockCorrection,
  approveClockCorrection,
  rejectClockCorrection
};
