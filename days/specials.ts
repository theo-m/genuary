import type Ip5 from "p5";
import { frame, grid, hsla, range, unif, unifctr } from "./rnd";

const meta = {
  id: "lorraine",
  official: false,
  name: "lorraine",
  comment: "wip",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  const perlinScale = 0.003;
  const strokeWidth = 3;
  const brushLength = 10;
  const space = 3;
  const jitter = space;

  new p5((s: Ip5) => {
    let bgim: Ip5.Image;
    s.preload = () => {
      bgim = s.loadImage("/geol.jpg");
    };
    s.setup = () => {
      s.createCanvas(w, h);
      // s.background("hsl(30, 30%, 90%)");
      // s.background(255);
      s.noLoop();
    };

    s.draw = () => {
      s.background("white");

      s.push();
      s.strokeWeight(strokeWidth);
      const field = grid(w, h).map(([x, y]) =>
        s.map(s.noise(x * perlinScale, y * perlinScale), 0, 1, 0, 3.14)
      );
      grid(w, h).map(([x, y]) => {
        if (x % space !== 0 || y % space !== 0) return;
        const c = bgim.get(x, y);
        const color = { h: s.hue(c), s: s.saturation(c), l: s.lightness(c) };
        s.stroke(
          hsla({
            hue: Math.floor(color.h),
            sat: Math.floor(color.s + unif(-5, 5)),
            light: Math.floor(color.l + unif(-7, 7)),
            alpha: unif(0.4, 0.6),
          })
        );
        const a = field[x * h + y];
        const [xn, yn] = [unif(-jitter, jitter), unif(-jitter, jitter)];
        const bl = [
          strokeWidth,
          strokeWidth * 1.5,
          strokeWidth * 2,
          strokeWidth * 4,
          strokeWidth * 6,
        ][Math.floor(color.h / (360 / 5))];
        const [xx, yy] = [x + xn + bl * s.cos(a), y + yn + bl * s.sin(a)];
        // const targetC = bgim.get(xx, yy);
        // const targetColor = {
        //   h: s.hue(targetC),
        //   s: s.saturation(targetC),
        //   l: s.lightness(targetC),
        // };
        // if (
        //   (color.h / 360 - targetColor.h / 360) ** 2 +
        //     (color.l / 100 - targetColor.l / 100) ** 2 +
        //     (color.s / 100 - targetColor.s / 100) ** 2 >
        //   0.5
        // )
        //   return;
        s.line(x + xn, y + yn, xx, yy);
      });

      grid(w, h).forEach(([x, y]) => {
        s.set(
          x,
          y,
          s.lerpColor(
            s.color(s.get(x, y)),
            s.color("white"),
            s.randomGaussian(0, 1) > 0 ? 0 : 0.3
          )
        );
      });
      s.updatePixels();
    };
  }, ref);
};

export default { ...meta, sketch };
