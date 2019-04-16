const { body } = require("express-validator/check");
const isBefore = require("date-fns/is_before");
const isSameDay = require("date-fns/is_same_day");
const getDay = require("date-fns/get_day");
const User = require("../models/user/user");

const validateLeaveRequest = [
  body("date")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Date is required")
    .custom(value => {
      if (isBefore(value, new Date())) {
        throw new Error("Date must not be in the past");
      } else {
        return value;
      }
    })
    .custom((value, { req }) => {
      return User.findById(req.user._id)
        .lean()
        .then(userTrainee => {
          const duplicateRequestDates = userTrainee.roleData.leaveRequests.filter(
            leaveRequest => isSameDay(leaveRequest.date, value)
          );

          const duplicateLeaveDates = userTrainee.roleData.leaves.filter(
            leaveRequest => isSameDay(leaveRequest.date, value)
          );

          if (duplicateLeaveDates.length > 0) {
            return Promise.reject("A leave on that day already exists");
          }

          if (duplicateRequestDates.length > 0) {
            return Promise.reject("A leave request on that day already exists");
          }

          return value;
        });
    })
    .custom((value, { req }) => {
      // >>> Check if the chosen date is already a day off
      return User.findById(req.user._id)
        .lean()
        .then(userTrainee => {
          const daysOfTheWeek = {
            0: "sunday",
            1: "monday",
            2: "tuesday",
            3: "wednesday",
            4: "thursday",
            5: "friday",
            6: "saturday"
          };

          const day = daysOfTheWeek[getDay(value)];

          const scheduleToday = userTrainee.roleData.schedule[day];

          if (scheduleToday.isTrainingDay === false) {
            return Promise.reject("Chosen date is already a day off.");
          }
        });
    }),

  body("reason")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Reason is required")
];

module.exports = { validateLeaveRequest };
