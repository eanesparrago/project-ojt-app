import differenceInSeconds from "date-fns/difference_in_seconds";
import round from "lodash/round";

export default clocks => {
  let timeRenderedInSeconds = 0;

  clocks.forEach(clock => {
    timeRenderedInSeconds += differenceInSeconds(clock.out, clock.in);
  });

  const timeRenderedInHours = round(timeRenderedInSeconds / 3600, 2);

  return `${timeRenderedInHours} hour ${timeRenderedInHours > 1 ? "s" : ""}`;
};
