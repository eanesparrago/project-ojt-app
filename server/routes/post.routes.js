const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");

router.route("/posts/test").get(PostController.testRoute);
router.route("/posts").get(PostController.getPosts);
router.route("/posts").post(PostController.createPost);

module.exports = router;