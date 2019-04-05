const Activity = require("../../models/activity");
const Group = require("../../models/group");
const User = require("../../models/user/user");
const enums = require("../../enums");

function logActivity(userId, type, typeId) {
  const newActivity = new Activity({
    user: userId,
    type: type
  });

  if (type === "clockIn" || type === "clockOut") {
    newActivity.typeId = typeId;
    newActivity.typeModel = "Clock";
  }

  if (type === "scheduleUpdate") {
    newActivity.typeId = typeId;
    newActivity.typeModel = "User";
  }

  let globalActivity;

  return newActivity.save().then(activity => {
    globalActivity = activity;

    // >>> After activity is saved, push to user and group activity...
    return User.findById(userId)
      .select("+activity")
      .then(user => {
        user.activity.push(globalActivity);
        return user.save();
      })
      .then(user => {
        if (user.role !== enums.roles.ADMINISTRATOR) {
          Group.findById(user.roleData.group._id).then(group => {
            group.activity.push(globalActivity);
            return group.save();
          });
        } else {
          return;
        }
      });
  });
}

function deleteActivityByClockId(clockId) {
  let globalActivity;

  return Activity.findOne({ typeId: clockId })
    .then(activity => {
      globalActivity = activity;
      return activity.remove();
    })
    .then(activity => {
      return User.findById(activity.user).select("+activity");
    })
    .then(user => {
      user.activity.remove(globalActivity);
      return user.save();
    });
}

module.exports = { logActivity, deleteActivityByClockId };
