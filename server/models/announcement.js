const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group"
  },
  message: {
    type: String,
    required: true
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Announcement = mongoose.model("Announcement", announcementSchema);