const User = require("../models/user/user");
const Clock = require("../models/clock");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const differenceInSeconds = require("date-fns/difference_in_seconds");
const differenceInMinutes = require("date-fns/difference_in_minutes");
const checkIfOvertime = require("../utils/checkIfOvertime");

/**
 * Test route
 * GET api/users/trainee/test
 * @param  req
 * @param  res
 * @private
 */
function testRoute(req, res) {
  res.status(200).json({ message: "Users Trainee test" });
}

function initializeUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

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
            .then(user => res.status(200).json(user))
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
  User.findById(req.user._id)
    .populate("roleData.group")
    .select("+roleData.clocks")
    .then(user => {
      const lastClockId = user.roleData.clocks[user.roleData.clocks.length - 1];

      Clock.findById(lastClockId, (err, clock) => {
        if (err) {
          return res.status(500).send(err);
        }

        // >>> If no clocks or not clocked in --> Clock in
        if (!clock || user.roleData.isClockedIn === false) {
          const newClock = new Clock({
            user: user._id
          });

          newClock.save((err, clock) => {
            if (err) {
              return res.status(500).send(err);
            }

            user.roleData.isClockedIn = true;
            user.roleData.clocks.push(clock);
            user.save((err, user) => {
              if (err) {
                return res.status(500).send(err);
              }

              User.populate(
                user,
                [
                  { path: "roleData.group", select: "name" },
                  { path: "roleData.clocks" }
                ],
                (err, user) => {
                  if (err) {
                    return res.status(500).send(err);
                  }

                  res.status(200).json(user);
                }
              );
            });
          });
        }

        // >>> If user is clocked in but time clocked out is less than 15 minutes then disregard and delete recent clock
        else if (
          user.roleData.isClockedIn &&
          differenceInMinutes(new Date(), clock.in) < 15
        ) {
          clock.remove();
          clock.save(err => {
            if (err) {
              return res.status(500).send(err);
            }

            user.roleData.clocks.remove(lastClockId);
            user.roleData.isClockedIn = false;
            user.save((err, user) => {
              if (err) {
                return res.status(500).send(err);
              }

              User.populate(
                user,
                [
                  { path: "roleData.group", select: "name" },
                  { path: "roleData.clocks" }
                ],
                (err, user) => {
                  if (err) {
                    return res.status(500).send(err);
                  }

                  res.status(200).json(user);
                }
              );
            });
          });
        }

        // >>> Last clock is not yet clocked out --> Clock out
        else if (clock.out !== null) {
          const secondsElapsed = differenceInSeconds(new Date(), clock.in);
          clock.out = Date.now();

          // >>> If seconds elapsed is greater than 12 hours and 15 minutes, set clock as invalid.
          if (secondsElapsed > 44100) {
            clock.isInvalid = true;
          } else {
            if (checkIfOvertime(user.roleData.schedule)) {
              clock.isOvertime = true;
              clock.overtimeReason = req.body.overtimeReason;
            }
          }

          clock.save(err => {
            if (err) {
              return res.status(500).send(err);
            }
            user.roleData.timeRendered += secondsElapsed;

            // >>> Check if finished or not
            if (user.roleData.timeRendered >= user.roleData.trainingDuration) {
              user.roleData.isFinished = true;
            } else {
              user.roleData.isFinished = false;
            }

            user.roleData.isClockedIn = false;
            user.save((err, user) => {
              if (err) {
                return res.status(500).send(err);
              }

              User.populate(
                user,
                [
                  { path: "roleData.group", select: "name" },
                  { path: "roleData.clocks" }
                ],
                (err, user) => {
                  if (err) {
                    return res.status(500).send(err);
                  }

                  res.status(200).json(user);
                }
              );
            });
          });
        }
      });
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

      globalUser.roleData.clockCorrectionRequest.isActive = false;
      globalUser.roleData.clockCorrectionRequest.in = null;
      globalUser.roleData.clockCorrectionRequest.out = null;
      globalUser.roleData.clockCorrectionRequest.clockId = null;

      return Promise.all([clock.save(), globalUser.save()]);
    })
    .then(([clock, user]) => {
      res
        .status(200)
        .send({ message: "Approve clock correction success", clock, user });
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
