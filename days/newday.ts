import type Ip5 from "p5";
import { frame, range, unif, unifctr } from "./rnd";

const meta = {
  id: "dev",
  official: true,
  name: "dev page",
  comment: "XXX",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  // PARAMS...
  const scale = 0.001;

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(0);
    };

    s.draw = () => {
      range(w).forEach((x) =>
        range(h).forEach((y) => {
          const val = [0.001, 0.005, 0.01]
            .map((sc, i) =>
              s.map(s.noise(x * sc, y * sc), 0, 1, 0, 255 / (i + 1))
            )
            .reduce((acc, v) => acc + v, 0);
          s.set(x, y, val);
        })
      );
      s.updatePixels();
    };
  }, ref);
};

export default { ...meta, sketch };
