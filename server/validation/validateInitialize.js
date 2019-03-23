const { body } = require("express-validator/check");
const upperFirst = require("lodash/upperFirst");

const validateInitialize = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("middleName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("nickname")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gender is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is not valid")
    .not()
    .isEmpty()
    .withMessage("Email is required"),

  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required"),

  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      } else {
        return value;
      }
    })
    .withMessage("Passwords must match")
];

const validateInitializeTrainee = [
  ...validateInitialize,

  body("school")
    .trim()
    .not()
    .isEmpty()
    .withMessage("School is required"),

  body("dateOfBirth")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Date of birth is required"),

  body("address")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Address is required")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("contactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Contact number is required"),

  body("adviserName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Adviser name is required")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("adviserContactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Adviser contact number is required"),

  body("guardianName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Guardian name is required")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("guardianContactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Guardian contact number is required")
];

module.exports = { validateInitialize, validateInitializeTrainee };
