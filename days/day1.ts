import type Ip5 from "p5";
const serverSideProps = {
  name: "10k",
  path: "d1-10k",
  comment: "",
  sketch: null,
};

const make = () => {
  const [w, h] = [400, 600];
  let t = 0;

  return {
    ...serverSideProps,

    sketch: (ref: HTMLDivElement) => {
      const p5 = require("p5");
      const m = (s: Ip5) => {
        s.setup = () => {
          s.createCanvas(w, h);
          s.background(0);
        };

        s.draw = () => {
          for (let i = 0; i < 10_000; i++) {
            const [x, y] = [
              Math.floor(Math.random() * w),
              Math.floor(Math.random() * h),
            ];
            s.circle(x, y, Math.random() * 3);
            s.fill(255);
          }
          s.updatePixels();
          // s.frameRate(60);
          // s.noLoop();
        };
      };

      new p5(m, ref);
    },
  };
};

export default typeof window === "undefined" ? serverSideProps : make();
