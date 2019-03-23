const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const enums = require("../../enums");

const UserEmployee = User.discriminator(
  enums.roles.EMPLOYEE,
  new Schema({
    roleData: {
      group: { type: Schema.Types.ObjectId, ref: "Group", default: null },
      isInitialized: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  })
);

module.exports = UserEmployee;
