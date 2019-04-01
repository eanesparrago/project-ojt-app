const express = require("express");
const router = express.Router();
const passport = require("passport");
const enums = require("../enums");
const permittedRoles = require("../utils/permittedRoles");
const { validateUpdateClock } = require("../validation/validateClock");

const ClockController = require("../controllers/clock.controller");

// >>> /api/clocks

// --->>> GET /api/clocks/test - testRoute
router
  .route("/test")
  .get(
    passport.authenticate("jwt", { session: false }),
    ClockController.testRoute
  );

// --->>> GET /api/clocks - getClocks
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    ClockController.getClocks
  );

// --->>> POST /api/clocks/:id - updateClock
router
  .route("/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    validateUpdateClock,
    ClockController.updateClock
  );

module.exports = router;
