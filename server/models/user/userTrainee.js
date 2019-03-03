const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enums = require("../../enums");

const User = require("./user");

const UserTrainee = User.discriminator(
  enums.roles.TRAINEE,
  new Schema({
    roleData: {
      trainingDuration: {
        type: Number,
        required: true,
        default: 0
      },
      hoursRendered: {
        type: Number,
        default: 0
      },
      schedule: {
        monday: {
          isWorkSchedule: {
            type: Boolean,
            default: false
          },
          startTime: {
            type: Number,
            default: 0
          },
          endTime: {
            type: Number,
            default: 0
          }
        },
        tuesday: {
          isWorkSchedule: {
            type: Boolean,
            default: false
          },
          startTime: {
            type: Number,
            default: 0
          },
          endTime: {
            type: Number,
            default: 0
          }
        },
        wednesday: {
          isWorkSchedule: {
            type: Boolean,
            default: false
          },
          startTime: {
            type: Number,
            default: 0
          },
          endTime: {
            type: Number,
            default: 0
          }
        },
        thursday: {
          isWorkSchedule: {
            type: Boolean,
            default: false
          },
          startTime: {
            type: Number,
            default: 0
          },
          endTime: {
            type: Number,
            default: 0
          }
        },
        friday: {
          isWorkSchedule: {
            type: Boolean,
            default: false
          },
          startTime: {
            type: Number,
            default: 0
          },
          endTime: {
            type: Number,
            default: 0
          }
        },
        saturday: {
          isWorkSchedule: {
            type: Boolean,
            default: false
          },
          startTime: {
            type: Number,
            default: 0
          },
          endTime: {
            type: Number,
            default: 0
          }
        },
        sunday: {
          isWorkSchedule: {
            type: Boolean,
            default: false
          },
          startTime: {
            type: Number,
            default: 0
          },
          endTime: {
            type: Number,
            default: 0
          }
        }
      },
      dateOfBirth: {
        type: Date,
        default: null
      },
      address: {
        type: String,
        default: ""
      },
      contactNumber: {
        type: String,
        default: ""
      },
      school: {
        type: String,
        default: ""
      },
      adviserName: {
        type: String,
        default: ""
      },
      adviserContactNumber: {
        type: String,
        default: ""
      },
      guardianName: {
        type: String,
        default: ""
      },
      guardianContactNumber: {
        type: String,
        default: ""
      },
      isInitialized: {
        type: Boolean,
        required: true,
        default: false
      },
      group: { type: Schema.Types.ObjectId, ref: "Group", default: null }
    }
  })
);

module.exports = UserTrainee;
