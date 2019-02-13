const User = require("../models/user");

/**
 * Test route
 * @route  GET api/users/test
 * @desc   Test users route
 * @param  req
 * @param  res
 * @private
 */
function testRoute(req, res) {
  res.status(200).json({ message: "User test" });
}

module.exports = {
  testRoute
};
