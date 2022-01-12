import type Ip5 from "p5";
import { frame, grid, randomColor, range, unif, unifctr } from "./rnd";

const meta = {
  id: "lorraine",
  official: false,
  name: "lorraine",
  comment: "wip",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = [800, 600];

  new p5((s: Ip5) => {
    let bgim: Ip5.Image;
    s.preload = () => {
      bgim = s.loadImage(
        "https://images.unsplash.com/photo-1641909267244-70d7f51ff7c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      );
      bgim.resize(w, h);
    };
    s.setup = () => {
      s.createCanvas(w, h);
      s.background("hsl(30, 30%, 90%)");
      s.noLoop();
    };

    s.draw = () => {
      const pixels = range(w * h).map((i) => ({
        x: Math.floor(i / h),
        y: i % h,
        v:
          s.randomGaussian(0, 1) < 0
            ? s.color("hsl(30, 30%, 80%)")
            : s.color("hsl(30, 30%, 98%)"),
      }));
      pixels.forEach(({ x, y, v }) => s.set(x, y, v));
      s.updatePixels();

      s.filter(s.BLUR, 2);
      s.loadPixels();
      pixels.forEach(({ x, y }) =>
        s.set(
          x,
          y,
          s.lightness(s.get(x, y)) < 90
            ? s.color("hsl(30, 30%, 90%)")
            : s.color("hsl(30, 30%, 92%)")
        )
      );
      s.updatePixels();

      s.push();
      s.strokeWeight(5);
      const field = grid(w, h).map(([x, y]) =>
        s.map(s.noise(x * 0.001, y * 0.001), 0, 1, 0, 3.14)
      );
      grid(w, h).map(([x, y]) => {
        if (unif(0, 1) > 0.02) return;
        // s.stroke(
        //   randomColor({
        //     hue: 0,
        //     light: Math.floor(unif(60, 80)),
        //     sat: 70,
        //     alpha: unif(0.5, 0.9),
        //   })
        // );
        const color = s.color(bgim.get(x, y));
        color.setAlpha(unif(65, 90));
        s.stroke(color);
        const a = field[x * h + y];
        s.line(
          x + unif(-1, 1),
          y + unif(-1, 1),
          x + 15 * s.cos(a),
          y + 15 * s.sin(a)
        );
      });
    };
  }, ref);
};

export default { ...meta, sketch };
