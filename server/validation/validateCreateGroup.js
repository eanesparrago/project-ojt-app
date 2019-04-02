const { body } = require("express-validator/check");
const enums = require("../enums");

const validateCreateGroup = [
  // >>> name
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ max: 30 })
    .withMessage("Name must not be over 30 characters"),

  // >>> location
  body("location").trim(),
  body("location")
    .optional({ checkFalsy: true })
    .isLength({ max: 60 })
    .withMessage("Location must not be over 60 characters"),

  // >>> phoneNumber
  body("phoneNumber").trim(),
  body("phoneNumber")
  .optional({ checkFalsy: true })
  .isLength({ max: 15 })
  .withMessage("Phone number must not be over 15 characters"),

];

module.exports = validateCreateGroup;
