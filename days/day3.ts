import type Ip5 from "p5";
import { frame, unif, unifctr } from "./rnd";

const serverSideProps = {
  name: "space",
  path: "d3-space",
  comment: "👩🏻‍🚀 fun to do, not the best thing... probly won't run on mobile?",
  sketch: null,
};

const d2o = () => {
  const n = 1_000;
  const tau = 0.02;

  return {
    ...serverSideProps,

    sketch: (ref: HTMLDivElement) => {
      const p5 = require("p5");
      const [w, h] = frame(ref);
      const m = (s: Ip5) => {
        let t = 0;
        const star = 160;
        const starsq = 80 ** 2;

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
          s.fill(255);
          s.circle(w / 2, h / 2, star);
          s.pop();

          particles.forEach((p) => {
            const x = w / 2 + p.vel * s.cos(p.phase + p.speed * t);
            const y = h / 2 + p.hel * s.sin(p.phase + p.speed * t);
            const r = p.radius * (1.3 + s.cos(t) / 9);
            if (
              (x - w / 2) ** 2 + (y - h / 2) ** 2 > starsq + r ** 2 ||
              y > h / 2
            ) {
              s.noStroke();
              s.circle(x, y, r);
              s.fill(p.color + 20 * s.cos(t));
            }
          });

          t += tau;
        };
      };

      new p5(m, ref);
    },
  };
};

export default typeof window === "undefined" ? serverSideProps : d2o();
