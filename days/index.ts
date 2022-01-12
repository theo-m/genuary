import day1 from "./day1";
import day2 from "./day2";
import day3 from "./day3";
import day3bis from "./day3bis";
import day4 from "./day4";
import day4flow from "./day4flow";
import day4int from "./day4int";
import newday from "./newday";
import day5 from "./day5";
import day9 from "./day9";
import specials from "./specials";

const days: Array<typeof day1> = [
  ...(process.env.NODE_ENV === "development" ? [newday] : []),
  day1,
  day2,
  day3,
  day3bis,
  day4,
  day4int,
  day4flow,
  day5,
  day9,
  specials,
];

export default days;
