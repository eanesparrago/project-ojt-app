import isToday from "date-fns/is_today";

const checkIfLeave = (leaves) => {
  let isLeaveToday = false;
  
  leaves.forEach(leave => {
    if (isToday(leave.date)) {
      isLeaveToday = true
    }
  })

  return isLeaveToday
}

export default checkIfLeave;