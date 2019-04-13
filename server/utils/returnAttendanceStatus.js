const isToday = require("date-fns/is_today");
const startOfToday = require("date-fns/start_of_today");
const addHours = require("date-fns/add_hours");
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

const returnAttendanceStatus = (schedule, isClockedIn, clocks) => {
  const scheduleToday = schedule[daysOfTheWeek[dayToday]];
  const todayStartTime = addHours(startOfToday(), scheduleToday.startTime);

  const endTime = scheduleToday.startTime + scheduleToday.hours;
  const todayEndTime = addHours(startOfToday(), endTime);
  const today = new Date();

  let lastClockInTime;
  if (clocks.length > 0) {
    lastClockInTime = clocks[clocks.length - 1].in;
  }

  if (isClockedIn) {
    return "in";
  }

  if (lastClockInTime && isToday(lastClockInTime)) {
    return "out";
  }

  if (scheduleToday.isTrainingDay === false) {
    return "off";
  }

  // >>> Today is training day but not clocked in yet...

  if (isAfter(today, todayEndTime)) {
    return "absent";
  }

  if (isAfter(today, todayStartTime)) {
    return "late";
  }

  return "later";
};

module.exports = returnAttendanceStatus;
