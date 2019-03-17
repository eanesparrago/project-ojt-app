const { body } = require("express-validator/check");

const validateCreateAnnouncement = [
  body("announcement.group")
    .not()
    .isEmpty()
    .withMessage("Group is required"),

  body("announcement.message")
    .not()
    .isEmpty()
    .withMessage("Message is required")
];

module.exports = validateCreateAnnouncement;
