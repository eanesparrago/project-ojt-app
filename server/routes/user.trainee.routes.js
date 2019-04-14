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
const validateUpdateSchedule = require("../validation/validateUpdateSchedule");
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

// GET --->>> /api/trainee/download-daily-time-record/:id - downloadDailyTimeRecord
router
  .route("/download-daily-time-record/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(
      enums.roles.ADMINISTRATOR,
      enums.roles.SUPERVISOR,
      enums.roles.TRAINEE
    ),
    UserTraineeController.downloadDailyTimeRecord
  );

// GET --->>> /api/trainee/download-tasks/:id - downloadTasks
router
  .route("/download-tasks/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(
      enums.roles.ADMINISTRATOR,
      enums.roles.SUPERVISOR,
      enums.roles.TRAINEE
    ),
    UserTraineeController.downloadTasks
  );

// PUT --->>> /api/trainee/schedule-update-request - requestScheduleUpdate
router
  .route("/schedule-update-request")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    validateUpdateSchedule,
    UserTraineeController.requestScheduleUpdate
  );

// PUT --->>> /api/trainee/cancel-schedule-update-request - cancelScheduleUpdateRequest
router
  .route("/cancel-schedule-update-request")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    UserTraineeController.cancelScheduleUpdateRequest
  );

// PUT --->>> /api/trainee/approve-schedule-update-request - approveScheduleUpdateRequest
router
  .route("/approve-schedule-update-request")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.SUPERVISOR),
    UserTraineeController.approveScheduleUpdateRequest
  );

// PUT --->>> /api/trainee/reject-schedule-update-request - rejectClockCorrectionRequest
router
  .route("/reject-schedule-update-request")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.SUPERVISOR),
    UserTraineeController.rejectClockCorrectionRequest
  );

module.exports = router;
