const { body, check } = require("express-validator/check");
const enums = require("../enums");

const validateUpdateUser = [
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
    .withMessage("Email is not valid")
];

const validateUpdateUserTrainee = [
  ...validateUpdateUser,
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
    .withMessage("Training Duration must be a number not greater than 999"),

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

const validateUpdateUserSupervisor = [
  ...validateUpdateUser,
  // >>> group
  body("group", "Group is required")
    .not()
    .isEmpty()
    .withMessage("Group is required")
];

module.exports = {
  validateUpdateUser,
  validateUpdateUserTrainee,
  validateUpdateUserSupervisor
};
