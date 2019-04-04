const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: [
      "clockIn",
      "clockOut",
      "finish",
      "scheduleUpdate",
      "clockCorrection"
    ],
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Activity = mongoose.model("Activity", activitySchema);
