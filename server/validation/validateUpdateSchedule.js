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
    body(`${day}.isTrainingDay`)
      .not()
      .isEmpty(),

    body(`${day}.startTime`)
      .custom((value, { req, loc, path }) => {
        if (req.body[day].isTrainingDay) {
          const {
            startTime: previousStartTime,
            hours: previousHours
          } = req.body[previousDay];

          if (parseInt(previousStartTime) + parseInt(previousHours) > 24) {
            if (value < previousStartTime + previousHours - 24) {
              throw new Error("Conflict");
            }
          }
        }

        return true;
      })
      .isInt({ min: 0, max: 23 }),

    body(`${day}.hours`)
      .custom((value, { req, loc, path }) => {
        if (req.body[day].isTrainingDay) {
          if (value === 0) {
            throw new Error("Must not be empty");
          }
        }

        return true;
      })
      .isInt({ min: 1, max: 8 })
      .withMessage("Must be a number between 1 - 8")
  );
});

const validateUpdateSchedule = tests;

module.exports = validateUpdateSchedule;
