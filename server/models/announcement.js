const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);
