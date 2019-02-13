const Post = require("../models/post");

/**
 * Test route
 * @route  GET api/posts/test
 * @param  req
 * @param  res
 * @public
 */
function testRoute(req, res) {
  res.status(200).json({ message: "Posts test" });
}

/**
 * Get posts
 * @route  GET api/posts
 * @param  req
 * @param  res
 * @public
 */
function getPosts(req, res) {
  Post.find().then(posts => {
    if (!posts) {
      res.status(404);
    }
    res.json({ posts });
  });
}

/**
 * Create a post
 * @route  POST api/posts/test
 * @param  req, post: {title, body}
 * @param  res
 * @public
 */
function createPost(req, res) {
  if (!req.body.post.title || !req.body.post.body) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

module.exports = {
  testRoute,
  getPosts,
  createPost
};
