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
  body("firstName")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("First name must not be over 30 characters"),

  // >>> middleName
  body("middleName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),
  body("middleName")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("Middle name must not be over 30 characters"),

  // >>> lastName
  body("lastName")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),
  body("lastName")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("Last name must not be over 30 characters"),

  // >>> nickname
  body("nickname")
    .trim()
    .customSanitizer((value, { req }) => upperFirst(value)),
  body("nickname")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("Nickname must not be over 30 characters"),

  // >>> gender
  body("gender")
    .trim()
    .optional({ checkFalsy: true })
    .isIn(["male", "female"])
    .withMessage("Invalid gender value"),

  // >>> contactNumber
  body("contactNumber").trim(),
  body("contactNumber")
    .optional({ checkFalsy: true })
    .isLength({ max: 15 })
    .withMessage("Contact number must not be over 15 characters"),

  // >>> email
  body("email")
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is not valid")
    .isLength({ max: 100 })
    .withMessage("Email must not be over 100 characters")
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
  body("address")
    .optional({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage("Address must not be over 100 characters"),

  body("contactNumber").trim(),
  body("contactNumber")
    .optional({ checkFalsy: true })
    .isLength({ max: 15 })
    .withMessage("Contact number must not be over 15 characters"),
  body("school")
    .trim()
    .customSanitizer(value => upperFirst(value)),
  body("school")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("School must not be over 30 characters"),

  body("adviserName")
    .trim()
    .customSanitizer(value => upperFirst(value)),
  body("adviserName")
    .optional({ checkFalsy: true })
    .isLength({ max: 60 })
    .withMessage("Adviser name must not be over 60 characters"),

  body("adviserContactNumber").trim(),
  body("adviserContactNumber")
    .optional({ checkFalsy: true })
    .isLength({ max: 15 })
    .withMessage("Adviser contact number must not be over 15 characters"),

  body("guardianName")
    .trim()
    .customSanitizer(value => upperFirst(value)),
  body("guardianName")
    .optional({ checkFalsy: true })
    .isLength({ max: 60 })
    .withMessage("Guardian name must not be over 60 characters"),

  body("guardianContactNumber").trim(),
  body("guardianContactNumber")
    .optional({ checkFalsy: true })
    .isLength({ max: 15 })
    .withMessage("Guardian contact number must not be over 15 characters")
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
