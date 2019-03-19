const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/announcement.controller");
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const enums = require("../enums");
const validateCreateAnnouncement = require("../validation/validateCreateAnnouncement");

// >>> /api/announcements

// --->>> GET /api/announcements/test - testRoute
router
  .route("/test")
  .get(
    passport.authenticate("jwt", { session: false }),
    AnnouncementController.testRoute
  );

// --->>> POST /api/announcements - createAnnouncement
router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR, enums.roles.SUPERVISOR),
    validateCreateAnnouncement,
    AnnouncementController.createAnnouncement
  );

// --->>> GET /api/announcements - getAnnouncements
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR, enums.roles.SUPERVISOR),
    AnnouncementController.getAnnouncements
  );

// --->>> GET /api/announcements/:id - getAnnouncement
router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR, enums.roles.SUPERVISOR),
    AnnouncementController.getAnnouncement
  );

// --->>> PUT /api/announcements/:id - updateAnnouncement
router
  .route("/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR, enums.roles.SUPERVISOR),
    AnnouncementController.updateAnnouncement
  );

// --->>> DELETE /api/announcements/:id - deleteAnnouncement
router
  .route("/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR, enums.roles.SUPERVISOR),
    AnnouncementController.deleteAnnouncement
  );

module.exports = router;
