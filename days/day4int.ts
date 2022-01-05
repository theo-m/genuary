import type Ip5 from "p5";
import { frame, unif, unifctr } from "./rnd";

const meta = {
  id: "fidenza-int",
  official: false,
  name: "not day 4",
  comment:
    "learning about flow field, this is not really one but it looks cool",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  const num = 1_000;
  let particles = [...Array(num)].map(() => ({
    angle: unif(0, 2 * Math.PI),
    pos: [unif(-w / 4, w * 1.25), unif(-h / 4, h * 1.25)],
    step: unif(1, 2),
  }));

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(0);
    };

    s.draw = () => {
      s.fill(0, 40);
      s.noStroke();
      s.rect(0, 0, w, h);

      particles = particles.map(({ angle, pos: [x, y], step }) => {
        s.fill(255);
        s.ellipse(x, y, 5);
        return {
          pos: [x + step * s.cos(angle), y + step * s.sin(angle)],
          angle:
            angle +
            ((x - w / 2) ** 2 / w ** 2) * unifctr(Math.PI / 2, Math.PI / 8),
          step:
            step *
            Math.max(
              0.1,
              Math.min(
                1,
                (((w / 4) ** 2 + (h / 4) ** 2) /
                  ((x - w / 2) ** 2 + (y - h / 2) ** 2)) **
                  0.7
              )
            ),
        };
      });
    };
  }, ref);
};

export default { ...meta, sketch };
