const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const UserAdministratorController = require("../controllers/userAdministrator.controller");
const passport = require("passport");

const permit = require("../utils/permission");

// >>> /api/users
router
  .route("/test")
  .get(
    passport.authenticate("jwt", { session: false }),
    permit("trainee"),
    UserController.testRoute
  );

router.route("/register").post(UserController.createUser);
router.route("/login").post(UserController.loginUser);

module.exports = router;
