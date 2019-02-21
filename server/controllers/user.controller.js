const User = require("../models/user/user");
const UserAdministrator = require("../models/user/userAdministrator");
const UserSupervisor = require("../models/user/userSupervisor");
const UserEmployee = require("../models/user/userEmployee");
const UserTrainee = require("../models/user/userTrainee");

/**
 * Test route
 * GET api/users/test
 * @param  req
 * @param  res
 * @private
 */
function testRoute(req, res) {
  res.status(200).json({ message: "Users test" });
}

/**
 * Create user
 * POST api/users/test
 * @param  req
 * @param  res
 * @private
 */
function createUser(req, res) {
  const user = new UserTrainee({
    username: "delta",
    password: "delta"
  });

  user.save((saveErr, savedUser) => {
    if (saveErr) {
      res.send({ error: saveErr });
    }

    res.status(201).send({ data: savedUser });
  });
}

module.exports = {
  testRoute,
  createUser
};
