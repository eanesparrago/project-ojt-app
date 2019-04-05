const Activity = require("../../models/activity");
const Group = require("../../models/group");
const User = require("../../models/user/user");
const enums = require("../../enums");

function logActivity(userId, type, typeId) {
  return new Promise((resolve, reject) => {
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

    newActivity.save().then(activity => {
      globalActivity = activity;

      // >>> After activity is saved, push to user and group activity...
      User.findById(userId)
        .then(user => {
          user.activity.push(globalActivity);
          return user.save();
        })
        .then(user => {
          if (user.role !== enums.roles.ADMINISTRATOR) {
            Group.findById(user.roleData.group._id)
              .then(group => {
                group.activity.push(globalActivity);
                return group.save();
              })
              .then(group => {
                resolve();
              })
              .catch(err => {
                reject(err);
              });
          } else {
            resolve();
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}

function deleteActivityByClockId(clockId) {
  console.log(clockId);
  return new Promise((resolve, reject) => {
    Activity.findOne({ clock: clockId })
      .then(activity => {
        console.log(activity);

        return activity.remove();
      })
      .then(activity => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { logActivity, deleteActivityByClockId };
