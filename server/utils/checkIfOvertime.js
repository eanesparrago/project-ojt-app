const addHours = require("date-fns/add_hours");
const addMinutes = require("date-fns/add_minutes");
const startOfToday = require("date-fns/start_of_today");
const isAfter = require("date-fns/is_after");

const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

const dayToday = new Date().getDay();

function checkIfOvertime(schedule) {
  const scheduleToday = schedule[daysOfTheWeek[dayToday]];

  if (scheduleToday.isTrainingDay === false) {
    return true;
  }

  const now = new Date();

  const endTime = scheduleToday.startTime + scheduleToday.hours;
  const todayEndTime = addHours(startOfToday(), endTime);

  const finalEndTime = addMinutes(todayEndTime, 15);

  if (isAfter(now, finalEndTime)) {
    return true;
  } else {
    return false;
  }
}

module.exports = checkIfOvertime;
