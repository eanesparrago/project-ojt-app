const express = require("express");
const router = express.Router();
const AnnouncementController = require("../controllers/announcement.controller");
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");

// >>> /api/announcements

// --->>> GET /api/announcements/test - testRoute
router.route("/test").get(AnnouncementController.testRoute);

// --->>> POST /api/announcements - createAnnouncement
router.route("/").post(AnnouncementController.createAnnouncement);

// --->>> GET /api/announcements - getAnnouncements
router.route("/").get(AnnouncementController.getAnnouncements);

// --->>> DELETE /api/announcements/:id - deleteAnnouncement
router.route("/:id").delete(AnnouncementController.deleteAnnouncement);

module.exports = router;
