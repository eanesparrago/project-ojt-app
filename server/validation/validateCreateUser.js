const { body, check } = require("express-validator/check");
const upperFirst = require("lodash/upperFirst");

const enums = require("../enums");

const validateCreateUser = [
  // >>> role
  body("role")
    .trim()
    .isIn([
      enums.roles.ADMINISTRATOR,
      enums.roles.SUPERVISOR,
      enums.roles.TRAINEE,
      enums.roles.EMPLOYEE
    ])
    .withMessage("Invalid role value")
    .not()
    .isEmpty()
    .withMessage("Role is required"),

  // >>> username
  body("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 2 to 30 characters long"),

  // >>> password
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required"),

  // >>> confirmPassword
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
    .withMessage("Passwords must match"),

  // >>> firstName
  body("firstName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  // >>> middleName
  body("middleName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  // >>> lastName
  body("lastName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  // >>> nickname
  body("nickname")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  // >>> gender
  body("gender")
    .trim()
    .optional({ checkFalsy: true })
    .isIn(["male", "female"])
    .withMessage("Invalid gender value"),

  // >>> contactNumber
  body("contactNumber").trim(),

  // >>> email
  body("email")
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is not valid")
];

const validateCreateUserTrainee = [
  ...validateCreateUser,
  // >>> group
  body("group", "Group is required")
    .not()
    .isEmpty()
    .withMessage("Group is required"),

  body("trainingDuration")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Training Duration is required")
    .isInt({ min: 1, max: 999 })
    .withMessage("Training Duration must be a number from 1 to 999"),

  body("dateOfBirth")
    .trim()
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Date of Birth is invalid"),

  body("address")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("contactNumber").trim(),

  body("school")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("adviserName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),
  body("adviserContactNumber").trim(),

  body("guardianName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),

  body("guardianContactNumber").trim()
];

const validateCreateUserSupervisor = [
  ...validateCreateUser,
  // >>> group
  body("group", "Group is required")
    .not()
    .isEmpty()
    .withMessage("Group is required")
];

module.exports = {
  validateCreateUser,
  validateCreateUserTrainee,
  validateCreateUserSupervisor
};
