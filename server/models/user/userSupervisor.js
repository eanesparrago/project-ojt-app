const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

const UserSupervisor = User.discriminator(
  "supervisor",
  new Schema({
    roleData: {
      announcements: [
        {
          type: Schema.Types.ObjectId,
          ref: "Announcement"
        }
      ],
      department: { type: Schema.Types.ObjectId, ref: "Department" }
    }
  })
);

module.exports = UserSupervisor;
