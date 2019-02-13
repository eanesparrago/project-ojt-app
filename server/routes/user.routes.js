const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.route("/users/test").get(UserController.testRoute);

module.exports = router;
