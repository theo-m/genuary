import type Ip5 from "p5";
import { frame, randomColor, range, unif, unifctr } from "./rnd";

const meta = {
  id: "friend",
  official: true,
  name: "like a friend",
  comment: "wip",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  // PARAMS...
  const scale = 0.001;

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(255);
    };

    const newParams = () => {
      const n = Math.floor(unif(10, h * 0.05));
      return {
        n,
        color: randomColor(),
        heights: range(n).map(() => unif(5, h * 0.05)),
      };
    };
    let p = newParams();
    s.mouseClicked = () => {
      p = newParams();
    };

    s.draw = () => {
      s.push();
      s.fill(p.color);
      s.noStroke();
      range(p.n).forEach((i) => {
        s.rect(0, i * h * 0.05, w, p.heights[i]);
      });
      s.pop();

      s.push();
      s.noStroke();
      range(w).forEach((x) =>
        range(h).forEach((y) => {
          const val = [0.05, 0.5]
            .map((sc, i) => s.map(s.noise(x * sc, y * sc), 0, 1, 0, 255 / 2))
            .reduce((acc, v) => acc + v, 0);
          val < 120 &&
            s.set(
              x,
              y,
              s.lerpColor(s.color([255, 255, 255]), s.color(s.get(x, y)), 0.8)
            );
        })
      );
      s.updatePixels();
      s.pop();
    };
  }, ref);
};

export default { ...meta, sketch };
