const schedule = require("node-schedule");

const User = require("../models/user/user");
const enums = require("../enums");
const returnAttendanceStatus = require("./returnAttendanceStatus");

// >>> Log trainee schedule for today right before the next day (23:59)
const calendarer = () => {
  schedule.scheduleJob("59 23 * * *", function() {
    User.find({ role: enums.roles.TRAINEE })
      .select("+roleData.clocks")
      .select("+roleData.calendar")
      .populate({ path: "roleData.clocks" })
      .then(trainees => {
        if (!trainees) {
          console.log("No trainees found.");
          return;
        }

        for (const trainee of trainees) {
          const {
            roleData: { schedule, isClockedIn, clocks }
          } = trainee;

          const attendanceToday = returnAttendanceStatus(
            schedule,
            isClockedIn,
            clocks
          );

          const newDay = {
            status:
              (attendanceToday === "absent" && "absent") ||
              (attendanceToday === "off" && "off") ||
              "present"
          };

          trainee.roleData.calendar.push(newDay);

          trainee.save().catch(err => {
            console.log(err);
          });
        }

        // trainees.forEach(trainee => {

        // });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = calendarer;
