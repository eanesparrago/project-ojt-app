const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const passport = require("passport");

const permit = require("../utils/permit");
const dynamicValidation = require("../validation/dynamicValidation");
const {
  validateRegisterUser,
  validateRegisterUserTrainee
} = require("../validation/validateRegisterUser");

// >>> /api/users

/**
 * Test route
 * GET api/users/test
 * @param  req
 * @param  res
 * @private
 */
router
  .route("/test")
  .get(
    passport.authenticate("jwt", { session: false }),
    permit("trainee"),
    UserController.testRoute
  );

/**
 * Create user
 * POST api/users/test
 * @param  req
 * @param  res
 * @private
 */
router
  .route(
    "/register",
    passport.authenticate("jwt", { session: false }),
    permit("administrator")
  )
  .post(function(req, res, next) {
    if (req.body.role === "trainee") {
      dynamicValidation(validateRegisterUserTrainee, req, res, next);
    } else {
      dynamicValidation(validateRegisterUser, req, res, next);
    }
  }, UserController.createUser);

/**
 * Login user
 * POST api/users/login
 * @param  req
 * @param  res
 * @public
 */
router.route("/login").post(UserController.loginUser);

module.exports = router;
