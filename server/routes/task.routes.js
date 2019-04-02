const express = require("express");
const router = express.Router();
const passport = require("passport");
const permittedRoles = require("../utils/permittedRoles");
const enums = require("../enums");

const TaskController = require("../controllers/task.controller");
const { validateCreateTask } = require("../validation/validateTask");

// >>> /api/tasks

// --->>> GET /api/tasks/test - testRoute
router
  .route("/test")
  .get(
    passport.authenticate("jwt", { session: false }),
    TaskController.testRoute
  );

// --->>> POST /api/tasks - createTask
router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    validateCreateTask,
    TaskController.createTask
  );

// --->>> GET /api/tasks - getAllTasks
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(
      enums.roles.ADMINISTRATOR,
      enums.roles.SUPERVISOR,
      enums.roles.EMPLOYEE
    ),
    TaskController.getTasks
  );

// --->>> GET /api/tasks/own - getOwnTasks
router
  .route("/own")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    TaskController.getOwnTasks
  );

// --->>> GET /api/tasks/task/:id - getTaskById
router
  .route("/task/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    TaskController.getTaskById
  );

// --->>> POST /api/tasks/task/:id - updateTask
router
  .route("/task/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    validateCreateTask,
    TaskController.updateTask
  );

// --->>> DELETE /api/tasks/task/:id - deleteTask
router
  .route("/task/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    permittedRoles(enums.roles.TRAINEE),
    TaskController.deleteTask
  );

module.exports = router;
