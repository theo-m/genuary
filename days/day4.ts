import type Ip5 from "p5";
import { frame, range, unif } from "./rnd";

const meta = {
  id: "fidenza",
  official: true,
  name: "fidenza",
  comment:
    "not super happy with this, some artifacts i've not been able to remove in time - cool learning exp though",
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
    Math.floor(-h * overflow),
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

    const fieldFun = (x: number, y: number, phase: number = 0.005) =>
      [phase, phase * 2, phase * 4, phase * 8]
        .map((scale, i) =>
          s.map(s.noise(x * scale, y * scale), 0, 1, 0, (2 * Math.PI) / (i + 1))
        )
        .reduce((acc, v) => acc + v, 0);

    const makeField = (param: number = 0.005) =>
      range(nrows).map((x) => range(ncols).map((y) => fieldFun(x, y, param)));

    let field = makeField();

    const initParticles = () =>
      field
        .flat()
        .map((angle, i) => ({
          loc: [
            (i * resolution) / ncols + resolution / 2,
            (i % ncols) * resolution + resolution / 2,
          ],
          angle,
          color: `hsl(${((i / nrows / ncols) * 360) | 0}, 100%, 50%)`,
          width: Math.floor(unif(4, 20)),
        }))
        .filter(() => Math.random() > 0.9);

    let particles = initParticles();

    let cnt = 0;
    s.mouseClicked = () => {
      s.background(0);
      field = makeField(unif(0.001, 0.01));
      particles = initParticles();
      cnt = 0;
    };
    s.draw = () => {
      if (cnt > length) {
        return;
      }

      particles = particles.map(({ angle, loc: [x, y], color, width }) => {
        const [newX, newY] = [
          x + ssize * s.cos(angle),
          y + ssize * s.sin(angle),
        ];
        s.push();
        s.stroke(color);
        s.strokeWeight((width * (cnt - length / 2)) / length);
        s.line(x, y, newX, newY);
        s.pop();

        return {
          angle:
            field[Math.floor(newY / resolution)]?.[
              Math.floor(newX % resolution)
            ] ?? 0,
          loc: [
            newX < xmin || newX > xmax ? unif(xmin, xmax) : newX,
            newY < ymin || newY > ymax ? unif(ymin, ymax) : newY,
          ],
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
