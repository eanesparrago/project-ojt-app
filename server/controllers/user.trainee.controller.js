const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const differenceInSeconds = require("date-fns/difference_in_seconds");
const differenceInMinutes = require("date-fns/difference_in_minutes");
const checkIfOvertime = require("../utils/checkIfOvertime");
const json2csv = require("json2csv").parse;
const fs = require("fs");
const path = require("path");
const format = require("date-fns/format");

const User = require("../models/user/user");
const Clock = require("../models/clock");

const ActivityUtils = require("./utils/activity");
const UserUtils = require("./utils/user");

/**
 * Test route
 * GET api/trainee/test
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
 * POST api/trainee/clock
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
            return UserUtils.returnUser(globalUser._id);
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
            return UserUtils.returnUser(globalUser._id);
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

        let isClockValid = true;

        // >>> If seconds elapsed is greater than 12 hours and 15 minutes, set clock as invalid.
        if (secondsElapsed > 44100) {
          clock.isInvalid = true;
          isClockValid = false;
        } else if (checkIfOvertime(globalUser.roleData.schedule)) {
          clock.isOvertime = true;
          clock.overtimeReason = req.body.overtimeReason;
        }

        clock
          .save()
          .then(clock => {
            globalClock = clock;

            if (isClockValid === true) {
              globalUser.roleData.timeRendered += secondsElapsed;
            }

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
            return UserUtils.returnUser(globalUser._id);
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
 * POST api/trainee/clock-correction
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
 * POST api/trainee/cancel-clock-correction
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
 * POST api/trainee/approve-clock-correction
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
      if (clock.isInvalid === true) {
        globalUser.roleData.timeRendered += differenceInSeconds(
          globalUser.roleData.clockCorrectionRequest.out,
          globalUser.roleData.clockCorrectionRequest.in
        );
      } else {
        const oldClockSeconds = differenceInSeconds(clock.out, clock.in);
        const newClockSeconds = differenceInSeconds(
          globalUser.roleData.clockCorrectionRequest.out,
          globalUser.roleData.clockCorrectionRequest.in
        );

        globalUser.roleData.timeRendered -= oldClockSeconds;
        globalUser.roleData.timeRendered += newClockSeconds;
      }

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
 * POST api/trainee/reject-clock-correction
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

const dtrFields = [
  {
    label: "Date",
    value: row => format(row.in, "MM/DD/YYYY")
  },
  {
    label: "Time In",
    value: row => format(row.in, "HH:mm")
  },
  {
    label: "Time Out",
    value: row => row.out && format(row.out, "HH:mm")
  },
  {
    label: "Total Hours",
    value: row => differenceInMinutes(row.out, row.in) / 60
  },
  {
    label: "With Overtime",
    value: row => (row.isOvertime ? "Yes" : "No")
  },
  {
    label: "Overtime Reason",
    value: row => row.overtimeReason
  },
  {
    label: "Is Invalid?",
    value: row => (row.isInvalid ? "Yes" : "No")
  }
];

function downloadDailyTimeRecord(req, res) {
  User.findById(req.params.id)
    .lean()
    .select("+roleData.clocks")
    .populate({ path: "roleData.clocks" })
    .then(user => {
      let csv;

      try {
        csv = json2csv(user.roleData.clocks, { fields: dtrFields });
      } catch (err) {
        console.log(err);

        return res.status(500).json({ err });
      }
      const dateTime = format(new Date(), "YYYYMMDDhhmmss");
      const filePath = path.join(
        __dirname,
        "..",
        "export",
        "dtr-csv-" + dateTime + ".csv"
      );
      fs.writeFile(filePath, csv, err => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          setTimeout(function() {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
          }, 30000);
          res.download(filePath);
        }
      });
    });
}

const tasksFields = [
  {
    label: "Date Created",
    value: row => format(row.dateCreated, "MM/DD/YYYY HH:mm")
  },
  {
    label: "Task",
    value: "content"
  },
  {
    label: "Ticket Number",
    value: row => row.ticketNumber && row.ticketNumber
  }
];

function downloadTasks(req, res) {
  User.findById(req.params.id)
    .lean()
    .select("+roleData.tasks")
    .populate({ path: "roleData.tasks" })
    .then(user => {
      let csv;

      try {
        csv = json2csv(user.roleData.tasks, { fields: tasksFields });
      } catch (err) {
        console.log(err);

        return res.status(500).json({ err });
      }

      const dateTime = format(new Date(), "YYYYMMDDhhmmss");
      const filePath = path.join(
        __dirname,
        "..",
        "export",
        "tasks-csv-" + dateTime + ".csv"
      );
      fs.writeFile(filePath, csv, err => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          setTimeout(function() {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
          }, 30000);
          res.download(filePath);
        }
      });
    });
}

/**
 * Submit schedule update request
 * PUT api/trainee/schedule-update-request
 * @param req.body
 */
function requestScheduleUpdate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findById(req.user._id).then(user => {
    user.roleData.scheduleUpdateRequest.isActive = true;
    user.roleData.scheduleUpdateRequest.schedule = req.body;

    user.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).json(user);
    });
  });
}

/**
 * Cancel schedule update request
 * PUT api/trainee/cancel-schedule-update-request
 */
function cancelScheduleUpdateRequest(req, res) {
  User.findById(req.user._id)
    .then(user => {
      user.roleData.scheduleUpdateRequest.isActive = false;

      return user.save();
    })
    .then(user => {
      res.status(200).json({
        message: "Cancelled schedule update request successfully.",
        user
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Approve schedule correction request
 * PUT api/trainee/approve-schedule-update-request
 * @param req.body.userId
 */
function approveScheduleUpdateRequest(req, res) {
  User.findById(req.body.userId)
    .then(userTrainee => {
      if (!userTrainee) {
        return res.status(400).json({ message: "User not found." });
      }

      userTrainee.roleData.schedule =
        userTrainee.roleData.scheduleUpdateRequest.schedule;
      userTrainee.roleData.scheduleUpdateRequest.isActive = false;

      return userTrainee.save();
    })
    .then(userTrainee =>
      res.status(200).json({
        message: "Approved schedule update successfully.",
        user: userTrainee
      })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Reject schedule correction request
 * PUT api/trainee/reject-schedule-update-request
 * @param req.body.userId
 */
function rejectClockCorrectionRequest(req, res) {
  User.findById(req.body.userId)
    .then(userTrainee => {
      if (!userTrainee) {
        return res.status(404).json({ message: "User not found." });
      }

      userTrainee.roleData.scheduleUpdateRequest.isActive = false;

      return userTrainee.save();
    })
    .then(userTrainee =>
      res.status(200).json({
        message: "Rejected schedule update successfully.",
        user: userTrainee
      })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Request leave (Trainee)
 * PUT api/trainee/request-leave
 * @param req.body.date
 * @param req.body.reason
 */
function requestLeave(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findById(req.user._id)
    .then(userTrainee => {
      userTrainee.roleData.leaveRequests.push({
        date: req.body.date,
        reason: req.body.reason
      });

      return userTrainee.save();
    })
    .then(userTrainee => {
      return res.status(200).json({
        message: "Leave request submitted successfully.",
        user: userTrainee
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Cancel leave request
 * PUT api/trainee/cancel-leave-request
 * @param req.body.leaveRequestId
 */
function cancelLeaveRequest(req, res) {
  User.findById(req.user._id)
    .then(userTrainee => {
      userTrainee.roleData.leaveRequests.remove(req.body.leaveRequestId);

      return userTrainee.save();
    })
    .then(userTrainee => {
      return res.status(200).json({
        message: "Leave request cancelled successfully.",
        user: userTrainee
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Approve leave request
 * PUT api/trainee/approve-leave-request
 * @param req.body.userId
 * @param req.body.leaveRequestId
 */
function approveLeaveRequest(req, res) {
  User.findById(req.body.userId)
    .then(userTrainee => {
      const leave = userTrainee.roleData.leaveRequests.find(leaveRequest =>
        leaveRequest._id.equals(req.body.leaveRequestId)
      );

      if (!leave) {
        throw new Error("Leave request not found.");
      }

      userTrainee.roleData.leaves.push(leave);
      userTrainee.roleData.leaveRequests.remove(leave._id);

      return userTrainee.save();
    })
    .then(userTrainee => {
      return res.status(200).json({
        message: "Leave request approved successfully.",
        user: userTrainee
      });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred.", error: err.message });
    });
}

/**
 * Reject leave request
 * PUT api/trainee/reject-leave-request
 * @param req.body.userId
 * @param req.body.leaveRequestId
 */
function rejectLeaveRequest(req, res) {
  User.findById(req.body.userId)
    .then(userTrainee => {
      const leave = userTrainee.roleData.leaveRequests.find(leaveRequest =>
        leaveRequest._id.equals(req.body.leaveRequestId)
      );

      if (!leave) {
        throw new Error("Leave request not found.");
      }

      userTrainee.roleData.leaveRequests.remove(leave._id);

      return userTrainee.save();
    })
    .then(userTrainee => {
      return res.status(200).json({
        message: "Leave request rejected successfully.",
        user: userTrainee
      });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .json({ message: "An error occurred", err: err.message });
    });
}

module.exports = {
  testRoute,
  initializeUser,
  userClock,
  requestClockCorrection,
  cancelClockCorrection,
  approveClockCorrection,
  rejectClockCorrection,
  downloadDailyTimeRecord,
  downloadTasks,
  requestScheduleUpdate,
  cancelScheduleUpdateRequest,
  approveScheduleUpdateRequest,
  rejectClockCorrectionRequest,
  requestLeave,
  cancelLeaveRequest,
  approveLeaveRequest,
  rejectLeaveRequest
};
