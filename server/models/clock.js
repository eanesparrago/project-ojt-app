const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clockSchema = new Schema({
  in: {
    type: Date,
    default: Date.now
  },
  out: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  isOvertime: {
    type: Boolean,
    default: false
  },
  overtimeReason: {
    type: String
  },
  isInvalid: {
    type: Boolean,
    default: false
  }
});

module.exports = Clock = mongoose.model("Clock", clockSchema);
