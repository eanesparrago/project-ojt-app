const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enums = require("../../enums");

const User = require("./user");

const UserSupervisor = User.discriminator(
  enums.roles.SUPERVISOR,
  new Schema({
    roleData: {
      announcements: [
        {
          type: Schema.Types.ObjectId,
          ref: "Announcement"
        }
      ],
      group: { type: Schema.Types.ObjectId, ref: "Group" }
    }
  })
);

module.exports = UserSupervisor;
