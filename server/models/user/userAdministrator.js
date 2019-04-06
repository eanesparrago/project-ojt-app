const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const enums = require("../../enums");

const UserAdministrator = User.discriminator(
  enums.roles.ADMINISTRATOR,
  new Schema({
    roleData: {
      announcements: [
        {
          type: Schema.Types.ObjectId,
          ref: "Announcement"
        }
      ]
    }
  })
);

module.exports = UserAdministrator;
