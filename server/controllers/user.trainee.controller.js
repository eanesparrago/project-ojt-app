const User = require("../models/user/user");
const Clock = require("../models/clock");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const differenceInSeconds = require("date-fns/difference_in_seconds");

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
    .select("+roleData.clocks")
    .then(user => {
      const newClock = new Clock({
        type: user.roleData.isClockedIn ? "out" : "in",
        user: user._id
      });

      newClock.save((err, clock) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (user.roleData.isClockedIn === true) {
          // >>> Clock out if clocked in
          const lastClockInId =
            user.roleData.clocks[user.roleData.clocks.length - 1];

          Clock.findById(lastClockInId).then(clock => {
            const secondsElapsed = differenceInSeconds(new Date(), clock.time);

            user.roleData.timeRendered += secondsElapsed;
            user.roleData.isClockedIn = !user.roleData.isClockedIn;
            user.roleData.clocks.push(clock);

            user.save((err, user) => {
              if (err) {
                return res.status(500).send(err);
              }

              User.populate(
                user,
                { path: "roleData.group", select: "name" },
                (err, user) => {
                  if (err) {
                    return res.status(500).send(err);
                  }

                  res.status(200).json(user);
                }
              );
            });
          });
        } else {
          // >>> Clock in
          user.roleData.isClockedIn = !user.roleData.isClockedIn;
          user.roleData.lastClockInTime = Date.now();
          user.roleData.clocks.push(clock);

          user.save((err, user) => {
            if (err) {
              return res.status(500).send(err);
            }

            User.populate(
              user,
              { path: "roleData.group", select: "name" },
              (err, user) => {
                if (err) {
                  return res.status(500).send(err);
                }

                res.status(200).json(user);
              }
            );
          });
        }
      });
    })
    .catch(err => res.status(500).send(err));
}

module.exports = {
  testRoute,
  initializeUser,
  userClock
};
