import type Ip5 from "p5";
import { frame } from "./rnd";

const meta = {
  id: "dithering",
  name: "dithering",
  comment:
    "reimpl of something i saw on twitter, couldn't find the original work though",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  const gamma = 4;
  const r = 50 ** 2;

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(0);
    };

    s.draw = () => {
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          if (x < w / 2) {
            s.set(x, y, Math.random() > (y / h) ** gamma ? 0 : 255);
          } else {
            s.set(x, y, Math.random() > (1 - y / h) ** gamma ? 0 : 255);
          }
          const dist = (x - w / 2) ** 2 + (y - h / 2) ** 2;
          if (dist < r) {
            s.set(x, y, Math.random() > dist / r ? 255 : 0);
          }
        }
      }
      s.updatePixels();
      // s.frameRate(60);
      s.noLoop();
    };
  }, ref);
};

export default { ...meta, sketch };
