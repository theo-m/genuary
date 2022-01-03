import type Ip5 from "p5";

const serverSideProps = {
  name: "space",
  path: "d3-space",
  comment: "wip...",
  sketch: null,
};

const d2o = () => {
  const [w, h] = [400, 600];
  const [rmin, rmax] = [20, 30];
  const tau = 0.02;

  return {
    ...serverSideProps,

    sketch: (ref: HTMLDivElement) => {
      const p5 = require("p5");
      const m = (s: Ip5) => {
        let t = 0;

        s.setup = () => {
          const canvas = s.createCanvas(w, h);
          s.pixelDensity(1);
        };

        s.draw = () => {
          s.background("black");

          const x = w / 2 + (w / 3) * s.sin(t);
          const y = h / 2 + (w / 4) * s.cos(t);
          s.noStroke();
          s.circle(x, y, 2 * rmin + (rmax - rmin) * s.cos(t));
          s.fill(155 + 100 * s.cos(t));

          const xx = w / 2 + (w / 2) * s.sin(t);
          const yy = h / 2 + (w / 3) * s.cos(t);
          s.noStroke();
          s.circle(xx, yy, 2 * rmin + (rmax - rmin) * s.cos(t));
          s.fill(210 + 25 * s.cos(t));

          t += tau;
        };
      };

      new p5(m, ref);
    },
  };
};

export default typeof window === "undefined" ? serverSideProps : d2o();
