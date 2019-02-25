const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  supervisors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  trainees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  announcements: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }
  ],
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Group = mongoose.model("Group", groupSchema);
