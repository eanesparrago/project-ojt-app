const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/announcement.controller");
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const enums = require("../enums");

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
    permittedRoles(enums.roles.ADMINISTRATOR),
    AnnouncementController.createAnnouncement
  );

// --->>> GET /api/announcements - getAnnouncements
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    AnnouncementController.getAnnouncements
  );

// --->>> DELETE /api/announcements/:id - deleteAnnouncement
router
  .route("/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    AnnouncementController.deleteAnnouncement
  );

module.exports = router;
