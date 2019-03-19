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
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR, enums.roles.SUPERVISOR),
    GroupController.getGroups
  );

// --->>> GET /api/groups/group/:id - getGroup
router
  .route("/group/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    GroupController.getGroup
  );

// --->>> GET /api/groups/own - getOwnGroup
router
  .route("/own")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(
      enums.roles.SUPERVISOR,
      enums.roles.TRAINEE,
      enums.roles.EMPLOYEE
    ),
    GroupController.getOwnGroup
  );

// --->>> DELETE /api/groups/:id
router
  .route("/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    GroupController.deleteGroup
  );

// --->>> PUT /api/groups/:id
router
  .route("/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    validateCreateGroup,
    GroupController.editGroup
  );

module.exports = router;
