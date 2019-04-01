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
const {
  validateRequestClockCorrection
} = require("../validation/validateClock");
const enums = require("../enums");

// >>> /api/trainee

router.route("/test").get(UserTraineeController.testRoute);

// POST --->>> /api/trainee/initialize - initializeUser
router.route("/initialize").post(
  passport.authenticate("jwt", { session: false }),
  permittedRoles(
    enums.roles.TRAINEE,
    enums.roles.SUPERVISOR,
    enums.roles.EMPLOYEE
  ),
  function(req, res, next) {
    if (req.user.role === enums.roles.TRAINEE) {
      dynamicValidation(validateInitializeTrainee, req, res, next);
    } else {
      dynamicValidation(validateInitialize, req, res, next);
    }
  },
  UserTraineeController.initializeUser
);

// POST --->>> /api/trainee/clock - userClock
router
  .route("/clock")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    UserTraineeController.userClock
  );

// POST --->>> /api/trainee/clock-correction - requestClockCorrection
router
  .route("/clock-correction")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    validateRequestClockCorrection,
    UserTraineeController.requestClockCorrection
  );

// POST --->>> /api/trainee/cancel-clock-correction - cancelClockCorrection

router
  .route("/cancel-clock-correction")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    UserTraineeController.cancelClockCorrection
  );

// POST --->>> /api/trainee/approve-clock-correction - approveClockCorrection
router
  .route("/approve-clock-correction")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    UserTraineeController.approveClockCorrection
  );

// POST --->>> /api/trainee/reject-clock-correction - rejectClockCorrection
router
  .route("/reject-clock-correction")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    UserTraineeController.rejectClockCorrection
  );

module.exports = router;
