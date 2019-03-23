const express = require("express");
const router = express.Router();
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const UserTraineeController = require("../controllers/user.trainee.controller");
const {
  validateInitialize,
  validateInitializeTrainee
} = require("../validation/validateInitialize");
const dynamicValidation = require("../validation/dynamicValidation");
const enums = require("../enums");

// >>> /api/trainee

router.route("/test").get(UserTraineeController.testRoute);

router.route("/initialize").post(
  passport.authenticate("jwt", { session: false }),
  permittedRoles(
    enums.roles.TRAINEE,
    enums.roles.SUPERVISOR,
    enums.roles.EMPLOYEE
  ),
  function(req, res, next) {
    if (req.body.role === enums.roles.TRAINEE) {
      dynamicValidation(validateInitializeTrainee, req, res, next);
    } else {
      dynamicValidation(validateInitialize, req, res, next);
    }
  },
  UserTraineeController.initializeUser
);

module.exports = router;
