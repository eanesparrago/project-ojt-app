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

function returnEndTime(startTime, hours) {
  let endTime = startTime + hours;
  if (endTime > 24) {
    endTime -= 24;

    return `${endTime}:00 Next day`;
  }

  return `${endTime}:00`;
}

export default schedule => {
  if (schedule[daysOfTheWeek[dayToday]].isTrainingDay) {
    const startTime = `${schedule[daysOfTheWeek[dayToday]].startTime}:00`;
    const endTime = `${returnEndTime(
      schedule[daysOfTheWeek[dayToday]].startTime,
      schedule[daysOfTheWeek[dayToday]].hours
    )}`;
    const hours = `${schedule[daysOfTheWeek[dayToday]].hours} 
    hour${schedule[daysOfTheWeek[dayToday]].hours > 1 ? "s" : ""}`;

    return `${startTime} - ${endTime} (${hours})`;
  } else {
    return "Off";
  }
};
