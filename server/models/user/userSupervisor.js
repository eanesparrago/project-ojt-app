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
      isInitialized: {
        type: Boolean,
        required: true,
        default: false
      },
      group: { type: Schema.Types.ObjectId, ref: "Group", default: null }
    }
  })
);

module.exports = UserSupervisor;
