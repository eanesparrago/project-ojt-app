const { body } = require("express-validator/check");

const validateCreateTask = [
  body("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Content is required"),

  body("ticketNumber")
    .trim()
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("Ticket number must be a number")
];

module.exports = { validateCreateTask };
