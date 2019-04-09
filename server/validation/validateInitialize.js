const { body } = require("express-validator/check");
const upperFirst = require("lodash/upperFirst");

const validateInitialize = [
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isLength({ max: 30 })
    .withMessage("First name must not be over 30 characters")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("middleName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),
  body("middleName")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("Middle name must not be over 30 characters"),

  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 30 })
    .withMessage("Last name must not be over 30 characters")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("nickname")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),
  body("nickname")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("Nickname must not be over 30 characters"),

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
    .withMessage("Email is required")
    .isLength({ max: 100 })
    .withMessage("Email must not be over 100 characters"),

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
    .withMessage("School is required")
    .isLength({ max: 100 })
    .withMessage("School must not be over 100 characters"),

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
    .isLength({ max: 100 })
    .withMessage("Address must not be over 100 characters")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("contactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Contact number is required")
    .isLength({ max: 15 })
    .withMessage("Contact number must not be over 15 characters"),

  body("adviserName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Adviser name is required")
    .isLength({ max: 60 })
    .withMessage("Adviser name must not be over 60 characters")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("adviserContactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Adviser contact number is required")
    .isLength({ max: 15 })
    .withMessage("Adviser contact number must not be over 15 characters"),

  body("guardianName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Guardian name is required")
    .isLength({ max: 60 })
    .withMessage("Guardian name must not be over 60 characters")
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("guardianContactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Guardian contact number is required")
    .isLength({ max: 15 })
    .withMessage("Guardian contact number must not be over 15 characters")
];

module.exports = { validateInitialize, validateInitializeTrainee };
