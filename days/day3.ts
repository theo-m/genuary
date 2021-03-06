import type Ip5 from "p5";
import { frame, unif, unifctr } from "./rnd";

const meta = {
  id: "space",
  name: "space",
  official: true,
  comment:
    "moving! particles! fun to do, but not great to look at... probly won't run on mobile?",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);
  const n = 1_000;
  const tau = 0.02;

  new p5((s: Ip5) => {
    let t = 0;
    const star = 160;

    s.setup = () => {
      const canvas = s.createCanvas(w, h);
      s.pixelDensity(1);
    };

    const particles = [...Array(n)].map(() => ({
      speed: unif(0.7, 1.3),
      phase: unif(0, 2 * Math.PI),
      radius: unif(1, 4),
      vel: unifctr(w / 3, (2 * w) / 3),
      hel: unifctr(h / 6, (5 * h) / 6),
      color: Math.floor(unif(100, 230)),
    }));

    s.draw = () => {
      s.background("black");
      s.push();
      s.fill(240 + 10 * s.sin(3 * t));
      s.circle(w / 2, h / 2, star * (1 + s.sin(t) / 8));
      s.pop();

      particles.forEach((p) => {
        const x = w / 2 + p.vel * s.cos(p.phase + p.speed * t);
        const y = h / 2 + p.hel * s.sin(p.phase + p.speed * t);
        const r = p.radius * (1.3 + s.cos(p.speed * t) / 4);

        s.noStroke();
        s.circle(x, y, r);
        s.fill(p.color + 20 * s.cos(t));
      });

      t += tau;
    };
  }, ref);
};

export default { ...meta, sketch };
