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
      timeRendered: {
        type: Number,
        default: 0,
        required: true
      },
      schedule: {
        monday: {
          isTrainingDay: {
            type: Boolean,
            default: false,
            required: true
          },
          startTime: {
            type: Number,
            min: 0,
            max: 23,
            default: 0,
            required: true
          },
          hours: {
            type: Number,
            default: 1,
            required: true
          }
        },
        tuesday: {
          isTrainingDay: {
            type: Boolean,
            default: false,
            required: true
          },
          startTime: {
            type: Number,
            min: 0,
            max: 23,
            default: 0,
            required: true
          },
          hours: {
            type: Number,
            default: 1,
            required: true
          }
        },
        wednesday: {
          isTrainingDay: {
            type: Boolean,
            default: false,
            required: true
          },
          startTime: {
            type: Number,
            min: 0,
            max: 23,
            default: 0,
            required: true
          },
          hours: {
            type: Number,
            default: 1,
            required: true
          }
        },
        thursday: {
          isTrainingDay: {
            type: Boolean,
            default: false,
            required: true
          },
          startTime: {
            type: Number,
            min: 0,
            max: 23,
            default: 0,
            required: true
          },
          hours: {
            type: Number,
            default: 1,
            required: true
          }
        },
        friday: {
          isTrainingDay: {
            type: Boolean,
            default: false,
            required: true
          },
          startTime: {
            type: Number,
            min: 0,
            max: 23,
            default: 0,
            required: true
          },
          hours: {
            type: Number,
            default: 1,
            required: true
          }
        },
        saturday: {
          isTrainingDay: {
            type: Boolean,
            default: false,
            required: true
          },
          startTime: {
            type: Number,
            min: 0,
            max: 23,
            default: 0,
            required: true
          },
          hours: {
            type: Number,
            default: 1,
            required: true
          }
        },
        sunday: {
          isTrainingDay: {
            type: Boolean,
            default: false,
            required: true
          },
          startTime: {
            type: Number,
            min: 0,
            max: 23,
            default: 0,
            required: true
          },
          hours: {
            type: Number,
            default: 1,
            required: true
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
      clocks: [
        {
          type: Schema.Types.ObjectId,
          ref: "Clock"
        }
      ],
      isClockedIn: {
        type: Boolean,
        default: false
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
