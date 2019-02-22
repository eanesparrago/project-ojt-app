const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const passport = require("passport");
const permit = require("../utils/permit");
const dynamicValidation = require("../validation/dynamicValidation");
const {
  validateCreateUser,
  validateCreateUserTrainee
} = require("../validation/validateCreateUser");
const enums = require("../utils/enums");

// >>> /api/users
router
  .route("/test")
  .get(
    passport.authenticate("jwt", { session: false }),
    UserController.testRoute
  );

router
  .route(
    "/register",
    passport.authenticate("jwt", { session: false }),
    permit(enums.roles.ADMINISTRATOR)
  )
  .post(function(req, res, next) {
    if (req.body.role === enums.roles.TRAINEE) {
      dynamicValidation(validateCreateUserTrainee, req, res, next);
    } else {
      dynamicValidation(validateCreateUser, req, res, next);
    }
  }, UserController.createUser);

router
  .route(
    "/",
    passport.authenticate("jwt", { session: false }),
    permit(enums.roles.ADMINISTRATOR)
  )
  .get(UserController.getUsers);

router.route("/login").post(UserController.loginUser);

module.exports = router;
