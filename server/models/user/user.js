const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Announcement = require("../announcement");
const Clock = require("../clock");
const Task = require("../task");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    firstName: {
      type: String,
      default: ""
    },
    middleName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    nickname: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    dateCreated: {
      type: Date,
      default: Date.now
    },
    dateLastLoggedIn: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    profilePictureUrl: {
      type: String
    },
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity"
      }
    ]
  },
  {
    discriminatorKey: "role"
  }
);

// >>> https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose
userSchema.pre("remove", function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  Announcement.remove({ user: this._id }).exec();
  Clock.remove({ user: this._id }).exec();
  Task.remove({ user: this._id }).exec();
  next();
});

module.exports = User = mongoose.model("User", userSchema);
