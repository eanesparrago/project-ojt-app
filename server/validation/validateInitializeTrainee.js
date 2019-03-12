const { body, check } = require("express-validator/check");

const validateInitializeTrainee = [
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
    .withMessage("Passwords must match"),

  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last name is required"),

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
    .withMessage("Address is required"),

  body("contactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Contact number is required"),

  body("adviserName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Adviser name is required"),

  body("adviserContactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Adviser contact number is required"),

  body("guardianName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Guardian name is required"),

  body("guardianContactNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Guardian contact number is required")
];

module.exports = validateInitializeTrainee;
