const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const enums = require("../../enums");

const User = require("./user");

const UserTrainee = User.discriminator(
  enums.roles.TRAINEE,
  new Schema({
    roleData: {
      requiredHours: {
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
        type: Date
      },
      address: {
        type: String
      },
      contactNumber: {
        type: String
      },
      school: {
        type: String
      },
      adviserName: {
        type: String
      },
      adviserContactNumber: {
        type: String
      },
      guardianName: {
        type: String
      },
      guardianContactNumber: {
        type: String
      },
      isInitialized: {
        type: Boolean,
        required: true,
        default: false
      },
      group: { type: Schema.Types.ObjectId, ref: "Group" }
    }
  })
);

module.exports = UserTrainee;
