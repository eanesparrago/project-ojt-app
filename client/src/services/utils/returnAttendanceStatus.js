import isToday from "date-fns/is_today";
import startOfToday from "date-fns/start_of_today";
import addHours from "date-fns/add_hours";
import isAfter from "date-fns/is_after";

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

export default (schedule, isClockedIn, lastClockInTime) => {
  const scheduleToday = schedule[daysOfTheWeek[dayToday]];
  const todayStartTime = addHours(startOfToday(), scheduleToday.startTime);

  const x = scheduleToday.startTime + scheduleToday.hours;
  const todayEndTime = addHours(startOfToday(), x);
  const today = new Date();

  console.log(todayStartTime, today);

  if (isClockedIn) {
    return "in";
  }

  if (isToday(lastClockInTime)) {
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
