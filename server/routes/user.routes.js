const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.route("/test").get(UserController.testRoute);
router.route("/").post(UserController.createUser);

module.exports = router;
