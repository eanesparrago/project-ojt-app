const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/department.controller");
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const validateCreateDepartment = require("../validation/validateCreateDepartment");

const enums = require("../enums");

// >>> /api/departments
// --->>> GET /test - testRoute
router.route("/test").get(DepartmentController.testRoute);

// --->>> POST /api/departments - createDepartment
router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.ADMINISTRATOR),
    validateCreateDepartment,
    DepartmentController.createDepartment
  );

// --->>> GET /api/departments - getDepartments
router
  .route("/")
  .get(
    // passport.authenticate("jwt", { session: false }),
    // permittedRoles(enums.roles.ADMINISTRATOR),
    DepartmentController.getDepartments
  );

module.exports = router;
