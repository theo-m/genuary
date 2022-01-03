import day2 from "./day2";
import day3 from "./day3";
import day1 from "./day1";

const days: Array<{
  path: string;
  name: string;
  comment: string;
  sketch: null | ((ref: HTMLDivElement) => void);
}> = [day1, day2, day3];

export default days;
