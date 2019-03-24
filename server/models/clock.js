const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clockSchema = new Schema({
  type: {
    type: "String",
    required: true,
    enum: ["in", "out"]
  },
  time: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = Clock = mongoose.model("Clock", clockSchema);
