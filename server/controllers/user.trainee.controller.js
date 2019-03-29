const User = require("../models/user/user");
const Clock = require("../models/clock");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const differenceInSeconds = require("date-fns/difference_in_seconds");
const differenceInMinutes = require("date-fns/difference_in_minutes");

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
        // else if (
        //   user.roleData.isClockedIn &&
        //   differenceInMinutes(new Date(), clock.in) < 15
        // ) {
        //   clock.remove();
        //   clock.save(err => {
        //     if (err) {
        //       return res.status(500).send(err);
        //     }

        //     user.roleData.clocks.remove(lastClockId);
        //     user.roleData.isClockedIn = false;
        //     user.save((err, user) => {
        //       if (err) {
        //         return res.status(500).send(err);
        //       }

        //       User.populate(
        //         user,
        //         [
        //           { path: "roleData.group", select: "name" },
        //           { path: "roleData.clocks" }
        //         ],
        //         (err, user) => {
        //           if (err) {
        //             return res.status(500).send(err);
        //           }

        //           res.status(200).json(user);
        //         }
        //       );
        //     });
        //   });
        // }

        // >>> Last clock is not yet clocked out --> Clock out
        else if (clock.out !== null) {
          clock.out = Date.now();

          clock.save(err => {
            if (err) {
              return res.status(500).send(err);
            }

            const secondsElapsed = differenceInSeconds(new Date(), clock.in);

            user.roleData.timeRendered += secondsElapsed;
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

module.exports = {
  testRoute,
  initializeUser,
  userClock
};
