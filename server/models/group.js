const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    default: ""
  },
  phoneNumber: {
    type: String,
    default: ""
  },
  users: [
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
  activity: [
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
