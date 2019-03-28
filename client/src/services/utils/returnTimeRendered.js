import differenceInSeconds from "date-fns/difference_in_seconds";
import round from "lodash/round";

export default clocks => {
  if (!clocks || clocks.length === 0) {
    return "0";
  }

  // >>> First time clock in
  if (!clocks[0].out) {
    return "0";
  }

  let timeRenderedInSeconds = 0;

  clocks.forEach(clock => {
    if (clock.out) {
      timeRenderedInSeconds += differenceInSeconds(clock.out, clock.in);
    }
  });

  const timeRenderedInHours = round(timeRenderedInSeconds / 3600, 2);

  return `${timeRenderedInHours} hour${timeRenderedInHours > 1 ? "s" : ""}`;
};
