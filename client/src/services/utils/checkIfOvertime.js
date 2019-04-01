import addHours from "date-fns/add_hours";
import addMinutes from "date-fns/add_minutes";
import startOfToday from "date-fns/start_of_today";
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

export default schedule => {
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
};
