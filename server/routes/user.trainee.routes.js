const express = require("express");
const router = express.Router();
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const UserTraineeController = require("../controllers/user.trainee.controller");
const validateInitializeTrainee = require("../validation/validateInitializeTrainee");
const enums = require("../enums");

// >>> /api/trainee

router.route("/test").get(UserTraineeController.testRoute);

router
  .route("/initialize")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    validateInitializeTrainee,
    UserTraineeController.initializeUser
  );

module.exports = router;
