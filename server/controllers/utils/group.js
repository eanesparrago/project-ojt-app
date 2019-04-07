const Group = require("../../models/group");

const usersPopulate = {
  path: "users",
  select:
    "username profilePictureUrl roleData.isClockedIn roleData.schedule roleData.lastClockInTime roleData.clocks",
  populate: { path: "roleData.clocks", options: { limit: 1 } },
  modal: "Users"
};

/**
 * Return the group with populated fields
 * @param {ObjectId} groupId
 */
function returnGroup(groupId) {
  return Group.findById(groupId)
    .populate({
      path: "announcements",
      model: "Announcement",
      populate: { path: "user" }
    })
    .populate(usersPopulate);
}

module.exports = { returnGroup, usersPopulate };
