const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

const UserEmployee = User.discriminator(
  "employee",
  new Schema({
    roleData: {
      department: { type: Schema.Types.ObjectId, ref: "Department" }
    }
  })
);

module.exports = UserEmployee;
