const { body, check } = require("express-validator/check");
const enums = require("../enums");

const validateCreateUser = [
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

  // >>> firstName
  body("firstName").trim(),

  // >>> middleName
  body("middleName").trim(),

  // >>> lastName
  body("lastName").trim(),

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
    .withMessage("Email is not valid"),

  body("email").normalizeEmail()
];

const validateCreateUserTrainee = [
  ...validateCreateUser,
  body("requiredHours").trim(),
  body("requiredHours")
    .not()
    .isEmpty()
    .withMessage("Required Hours is required")
    .isInt({ max: 999 })
    .withMessage("Required Hours must be a number not greater than 999"),

  body("dateOfBirth")
    .trim()
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Date of Birth is invalid"),

  body("address").trim(),

  body("contactNumber").trim(),

  body("school").trim(),

  body("adviserName").trim(),

  body("adviserContactNumber").trim(),

  body("guardianName").trim(),

  body("guardianContactNumber").trim()
];

module.exports = {
  validateCreateUser,
  validateCreateUserTrainee
};
