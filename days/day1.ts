import type Ip5 from "p5";
import { frame } from "./rnd";

const meta = {
  id: "10k",
  name: "10k",
  official: true,
  comment: "dumb noise, just drew 10k circles 🤷",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);

  new p5((s: Ip5) => {
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
      s.noLoop();
    };
  }, ref);
};

export default { ...meta, sketch };
