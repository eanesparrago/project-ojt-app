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
      ],
      departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
      supervisors: [{ type: Schema.Types.ObjectId, ref: "Supervisor" }],
      trainees: [{ type: Schema.Types.ObjectId, ref: "Trainee" }],
      employee: [{ type: Schema.Types.ObjectId, ref: "Employee" }]
    }
  })
);

module.exports = UserAdministrator;
