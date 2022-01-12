import type Ip5 from "p5";
import { frame, hsla, range, unif, unifctr } from "./rnd";

const meta = {
  id: "friend",
  official: true,
  name: "like a friend",
  comment:
    "inspired by matt des lauriers, spent too much time on time, stopping here. https://twitter.com/mattdesl/status/1475928600146755586",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  let noiseLayer: Ip5.Graphics;
  let noiseLayer2: Ip5.Graphics;
  // PARAMS...
  const scale = 0.001;

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(255);
      s.noLoop();
      noiseLayer = s.createGraphics(w, h);
      noiseLayer2 = s.createGraphics(w, h);
      noiseLayer.clear();
      noiseLayer2.clear();
    };

    const newParams = () => {
      const n = Math.floor(unif(10, h * 0.05));
      return {
        n,
        color: hsla(),
        heights: range(n).map(() => unif(5, h * 0.05)),
      };
    };
    let p = newParams();

    s.draw = () => {
      s.push();
      // s.noStroke();

      range(p.n).forEach((i) => {
        let xcurr = 0;
        let ycurr = i * h * 0.05;
        s.stroke(`hsl(0, 0%, ${Math.floor(unif(30, 70))}%)`);
        s.strokeWeight(Math.floor(unif(1, 2)));
        s.fill(hsla({ alpha: 0.7 }));
        s.beginShape();
        s.vertex(xcurr, ycurr);
        range(100).forEach((j) => {
          const ynext =
            ycurr +
            (20 + 50 * Math.exp((-1 * (xcurr - w / 2) ** 2) / 100)) *
              (s.noise(xcurr, ycurr) - 0.5);
          s.vertex(xcurr, ycurr);
          xcurr += w / 100;
          ycurr = ynext;
        });
        xcurr = w;
        ycurr -= h * 0.05 * s.map(s.noise(xcurr, ycurr), 0, 1, 0.7, 1);
        range(100).forEach((j) => {
          const ynext =
            ycurr +
            (20 + 50 * Math.exp((-1 * (xcurr - w / 2) ** 2) / 100)) *
              (s.noise(xcurr, ycurr) - 0.5);
          s.vertex(xcurr, ycurr);
          xcurr -= w / 100;
          ycurr = ynext;
        });
        s.vertex(0, ycurr);
        s.endShape(s.CLOSE);
      });
      s.fill(hsla({ alpha: 0.7 }));
      s.circle(w / 2 - 3, h / 2 + 10, 514);
      s.fill(hsla({ alpha: 0.7 }));
      s.circle(w / 2 + 14, h / 2 - 3, 520);
      s.fill(hsla({ alpha: 0.7 }));
      s.circle(w / 2, h / 2, 500);
      s.pop();

      s.push();
      noiseLayer.noStroke();
      noiseLayer.background([0, 0, 0, 0]);
      range(w).forEach((x) =>
        range(h).forEach((y) => {
          const v = s.randomGaussian(0.5, 1);
          v < 0.4 &&
            noiseLayer.set(
              x,
              y,
              s.lerpColor(s.color([255, 255, 255]), s.color(s.get(x, y)), 0.9)
            );
        })
      );
      noiseLayer.updatePixels();
      noiseLayer.filter(noiseLayer.BLUR, 1);
      s.blendMode(s.SOFT_LIGHT);
      s.image(noiseLayer, 0, 0);

      // noiseLayer2.noStroke();
      // noiseLayer2.background([0, 0, 0, 0]);
      // range(w).forEach((x) =>
      //   range(h).forEach((y) => {
      //     const v = s.randomGaussian(0.5, 1);
      //     v < 0.1 &&
      //       noiseLayer2.set(
      //         x,
      //         y,
      //         s.lerpColor(s.color([255, 255, 255]), s.color(s.get(x, y)), 0.95)
      //       );
      //   })
      // );
      // noiseLayer2.updatePixels();
      // noiseLayer.filter(noiseLayer.BLUR, 1);
      // s.blendMode(s.OVERLAY);
      // s.image(noiseLayer2, 0, 0);

      s.pop();
    };
  }, ref);
};

export default { ...meta, sketch };
