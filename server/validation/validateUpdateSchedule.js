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
      .isInt({ min: 0, max: 23 })
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

        return value;
      }),

    // body(`${day}.hours`)
    //   .optional({ checkFalsy: true })
    //   .isInt({ min: 0, max: 23 })
    //   .withMessage("Must be a number between 0 - 23")
    //   .custom((value, { req, loc, path }) => {
    //     if (req.body[day].isTrainingDay) {
    //       if (value === "") {
    //         throw new Error("Must not be empty");
    //       }
    //     }

    //     return value;
    //   })
  );
});

const validateUpdateSchedule = tests;

module.exports = validateUpdateSchedule;
