const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
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
    contactNumber: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateLastLoggedIn: {
      type: Date,
      default: null
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
      default: false
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    photoUrl: {
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

module.exports = User = mongoose.model("User", userSchema);
