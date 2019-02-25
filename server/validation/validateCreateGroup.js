const { body } = require("express-validator/check");
const enums = require("../enums");

const validateCreateGroup = [
  // >>> name
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required"),

  // >>> location
  body("location").trim(),

  // >>> phoneNumber
  body("phoneNumber").trim()
];

module.exports = validateCreateGroup;
