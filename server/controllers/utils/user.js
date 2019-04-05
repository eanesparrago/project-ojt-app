const User = require("../../models/user/user");

/**
 * Return the user trainee with populated fields
 * @param {ObjectId} userId
 */
function returnTrainee(userId) {
  return User.findById(userId)
    .populate({
      path: "roleData.group",
      select: "name"
    })
    .select("+roleData.clocks")
    .populate({ path: "roleData.clocks" });
}

module.exports = { returnTrainee };
