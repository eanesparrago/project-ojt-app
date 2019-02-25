const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const validateCreateGroup = require("../validation/validateCreateGroup");

const enums = require("../enums");

// >>> /api/groups
// --->>> GET /test - testRoute
router.route("/test").get(GroupController.testRoute);

// --->>> POST /api/groups - createGroup
router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    validateCreateGroup,
    GroupController.createGroup
  );

// --->>> GET /api/groups - getGroups
router
  .route("/")
  .get(
    // passport.authenticate("jwt", { session: false }),
    // permittedRoles(enums.roles.ADMINISTRATOR),
    GroupController.getGroups
  );

module.exports = router;
