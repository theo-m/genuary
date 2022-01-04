import type Ip5 from "p5";
import { frame, pcos, range, unif, unifctr } from "./rnd";

const meta = {
  id: "fiudenzaflow",
  official: false,
  name: "semi working flowfield",
  comment:
    "particles should be respawned, but the day's prompt hint at a static image so won't impl that",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);

  const length = 100;
  const overflow = 0.4;
  const ssize = w * 0.005;
  const gsize = 0.02;

  //
  // --- field
  //
  const [xmin, xmax] = [
    Math.floor(-w * overflow),
    Math.floor(w * (1 + overflow)),
  ];
  const [ymin, ymax] = [
    Math.floor(-h * -overflow),
    Math.floor(h * (1 + overflow)),
  ];
  const resolution = Math.floor(w * gsize);
  const ncols = Math.ceil((xmax - xmin) / resolution);
  const nrows = Math.ceil((ymax - ymin) / resolution);

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(0);
    };

    const fieldFun = (x: number, y: number, phase: number = 0.01) =>
      s.map(s.noise(x * phase, y * phase), 0, 1, 0, 2 * Math.PI);

    const makeField = (param: number = 0) =>
      range(nrows).map((x) => range(ncols).map((y) => fieldFun(x, y, param)));

    let field = makeField();

    const initParticles = () =>
      field.flat().map((angle, i) => ({
        loc: [
          (i * resolution) / ncols + resolution / 2,
          (i % ncols) * resolution + resolution / 2,
        ],
        angle,
        color: 255 * unif(0.5, 1),
        width: Math.floor(unif(1, 4)),
      }));

    let particles = initParticles();

    let cnt = 0;
    s.draw = () => {
      if (cnt > length) {
        s.background(0);
        field = makeField(unif(0.01, 0.1));
        particles = initParticles();
        cnt = 0;
      }

      particles = particles.map(({ angle, loc: [x, y], color, width }) => {
        const [newX, newY] = [
          x + ssize * s.cos(angle),
          y + ssize * s.sin(angle),
        ];
        s.push();
        s.stroke(color, 60);
        s.strokeWeight(width);
        s.line(x, y, newX, newY);
        s.pop();

        return {
          angle:
            field[Math.floor(newY / resolution)]?.[
              Math.floor(newX % resolution)
            ] ?? 0,
          loc: [newX, newY],
          // loc: [x, y],
          color,
          width,
        };
      });

      cnt += 1;
    };
  }, ref);
};

export default { ...meta, sketch };
