import type Ip5 from "p5";
import { frame, pcos, range, unif, unifctr } from "./rnd";

const meta = {
  id: "fiudenza",
  official: true,
  name: "fiudenza",
  comment: "wip",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);

  const length = 200;
  const ssize = w * 0.001;
  const gsize = 0.05;

  //
  // --- field
  //
  const [xmin, xmax] = [Math.floor(w * -0.5), Math.floor(w * 1.5)];
  const [ymin, ymax] = [Math.floor(h * -0.5), Math.floor(h * 1.5)];
  const resolution = Math.floor(w * gsize);
  const ncols = Math.ceil((xmax - xmin) / resolution);
  const nrows = Math.ceil((ymax - ymin) / resolution);

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(0);
    };

    let field: Array<Array<number>> = range(ncols).map((x) =>
      range(nrows).map((y) => s.sin(x - ncols / 2) * 10 * s.sin(y - nrows / 2))
    );

    let particles = field.flat().map((angle, i) => ({
      loc: [
        (i * resolution) / ncols + resolution / 2,
        (i % ncols) * resolution + resolution / 2,
      ],
      angle,
      color: 255 * unif(0.5, 1),
      width: Math.floor(unif(1, 4)),
    }));

    let cnt = 0;
    s.draw = () => {
      if (cnt > length) {
        s.background(0);
        const phase = unif(0, Math.PI);
        const scale = unif(0, 5);
        field = range(ncols).map((x) =>
          range(nrows).map(
            (y) =>
              s.sin(scale * (phase + x - ncols / 2)) *
              6 *
              s.sin(scale * (phase + y - nrows / 2))
          )
        );
        particles = field.flat().map((angle, i) => ({
          loc: [
            (i * resolution) / ncols + resolution / 2,
            (i % ncols) * resolution + resolution / 2,
          ],
          angle,
          color: 255 * unif(0.5, 1),
          width: Math.floor(unif(1, 4)),
        }));
        cnt = 0;
      }
      s.push();
      // s.fill(0, 90);
      // s.noStroke();
      // s.rect(0, 0, w, h);
      s.pop();

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
          color,
          width,
        };
      });

      cnt += 1;
    };
  }, ref);
};

export default { ...meta, sketch };
