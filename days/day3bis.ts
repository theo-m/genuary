import type Ip5 from "p5";
import { frame, unif, unifctr } from "./rnd";

const meta = {
  id: "space2",
  name: "space2",
  official: false,
  comment: "was not satisfied with v1, now not satisfied with v2 yay",
  sketch: null,
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  const n = 2_000;
  const tau = 0.02;

  new p5((s: Ip5) => {
    let t = 0;
    const star = 160;

    s.setup = () => {
      const canvas = s.createCanvas(w, h);
      s.pixelDensity(1);
      s.noSmooth();
    };

    const particles = [...Array(n)].map(() => ({
      speed: unif(0.7, 1.3),
      phase: unif(0, 2 * Math.PI),
      radius: unif(1, 8),
      vel: unifctr(w, (2 * w) / 3),
      hel: unifctr(h / 4, h / 6),
      color: Math.floor(unif(100, 230)),
    }));

    s.draw = () => {
      // s.background("black");
      s.push();
      s.fill(0, 90);
      s.noStroke();
      s.rect(0, 0, w, h);
      s.pop();

      s.push();
      s.fill(60);
      s.circle(w / 4, h / 2, w / 4);

      s.fill(240 + 10 * s.sin(3 * t));
      s.circle((-3 * w) / 4, h / 4, 2 * w);
      s.pop();

      particles.forEach((p) => {
        const x = p.vel * s.cos(p.phase + p.speed * t);
        const y = h / 2 + p.hel * s.sin(p.phase + p.speed * t);
        const r = p.radius * (1.3 + s.cos(p.speed * t) / 4);

        if (x > w / 4 || y > h / 2) {
          s.noStroke();
          s.rect(x, y, r, r);
          s.fill(p.color + 20 * s.cos(t));
        }
      });

      t += tau;
    };
  }, ref);
};

export default { ...meta, sketch };
