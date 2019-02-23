const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const enums = require("../../enums");

const UserEmployee = User.discriminator(
  enums.roles.EMPLOYEE,
  new Schema({
    roleData: {
      department: { type: Schema.Types.ObjectId, ref: "Department" }
    }
  })
);

module.exports = UserEmployee;
