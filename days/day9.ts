import type Ip5 from "p5";
import { frame, randomColor, range, unif, unifctr } from "./rnd";

const meta = {
  id: "architecture",
  official: true,
  name: "architecture",
  comment: "wip",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  // PARAMS...
  const n = 300;

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(0);
      s.noLoop();
    };

    s.draw = () => {
      range(n).forEach((i) => {
        const idx = n - i;
        s.push();
        s.noStroke();
        s.fill(
          randomColor({
            sat: 20 - (idx * 20) / n,
            light: 90 - (idx * 90) / n,
          })
        );
        s.beginShape();
        const [x, y] = [unif(0, w), unif(h, h - ((1 + idx) * h) / n)];
        const [xx, yy] = [x + unif(40, 100), y - unif(80, 200)];
        s.vertex(x, y);
        s.vertex(xx, y + unif(-20, 20));
        s.vertex(xx, yy);
        s.vertex(x, yy - unif(-10, 10));
        s.endShape(s.CLOSE);
      });
    };
  }, ref);
};

export default { ...meta, sketch };
