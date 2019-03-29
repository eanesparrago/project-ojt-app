const { body } = require("express-validator/check");
const Clock = require("../models/clock");
const isBefore = require("date-fns/is_before");

const validateUpdateClock = [
  body("in")
    .not()
    .isEmpty()
    .withMessage("Clock in is required")
    .isISO8601()
    .withMessage("Clock out is invalid")
    .custom((value, { req, loc, path }) => {
      return Clock.findById(req.params.id).then(clock => {
        return Clock.find({ user: clock.user }).then(clocks => {
          const currentClockIndex = clocks.findIndex(userClock =>
            userClock._id.equals(clock._id)
          );
          const previousClock = clocks[currentClockIndex - 1];

          if (previousClock && isBefore(value, previousClock.out)) {
            return Promise.reject("Conflict with previous clock");
          }
        });
      });
    }),

  body("out")
    .not()
    .isEmpty()
    .withMessage("Clock out is required")
    .isISO8601()
    .withMessage("Clock out is invalid")
    .custom((value, { req }) => {
      if (isBefore(value, req.body.in)) {
        throw new Error("Clock out most not be before clock in");
      } else {
        return value;
      }
    })
    .withMessage("Clock out most not be before clock in")
    .custom((value, { req }) => {
      return Clock.findById(req.params.id).then(clock => {
        return Clock.find({ user: clock.user }).then(clocks => {
          const currentClockIndex = clocks.findIndex(userClock =>
            userClock._id.equals(clock._id)
          );
          const nextClock = clocks[currentClockIndex + 1];

          if (nextClock && isBefore(nextClock.in, value)) {
            return Promise.reject("Conflict with next clock");
          }
        });
      });
    })
];

module.exports = validateUpdateClock;
