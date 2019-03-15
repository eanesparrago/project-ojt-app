const { body } = require("express-validator/check");

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

let tests = [];

days.forEach((day, i) => {
  const previousDay = days[i - 1] || days[days.length - 1];
  const nextDay = days[i + 1] || days[0];

  tests.push(
    body(`schedule.${day}.isTrainingDay`)
      .not()
      .isEmpty(),

    body(`schedule.${day}.startTime`)
      .not()
      .isEmpty()
      .isInt({ min: 0, max: 23 })
      .custom((value, { req, loc, path }) => {
        const {
          startTime: previousStartTime,
          hours: previousHours
        } = req.body.schedule[previousDay];

        if (previousStartTime + previousHours > 24) {
          if (value < previousStartTime + previousHours - 24) {
            throw new Error("Conflict");
          }
        }

        return value;
      }),

    body(`schedule.${day}.hours`)
      .not()
      .isEmpty()
      .isInt({ min: 0, max: 23 })
  );
});

const validateUpdateSchedule = tests;

module.exports = validateUpdateSchedule;
