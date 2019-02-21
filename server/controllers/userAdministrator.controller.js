const UserAdministrator = require("../models/user/userAdministrator");

/**
 * Create user
 * POST api/users/test
 * @param  req
 * @param  res
 * @private
 */
function createUser(req, res) {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({
        error: "Username already exists"
      });
    } else {
      const user = new UserAdministrator({
        username: "delta",
        password: "delta"
      });

      user.save().then(user => res.json(user));
    }
  });
}

module.exports = {
  createUser
};
