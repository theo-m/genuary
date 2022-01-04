import type Ip5 from "p5";
import { frame, range, unif, unifctr } from "./rnd";

const meta = {
  id: "fiudenza",
  official: true,
  name: "fiudenza",
  comment: "wip",
};

const sketch = (ref: HTMLDivElement) => {
  const p5 = require("p5");

  const [w, h] = frame(ref);

  const length = 50;

  //
  // --- field
  //
  const [xmin, xmax] = [Math.floor(w * -0.5), Math.floor(w * 1.5)];
  const [ymin, ymax] = [Math.floor(h * -0.5), Math.floor(h * 1.5)];
  const resolution = Math.floor(w * 0.03);
  const ncols = Math.ceil((xmax - xmin) / resolution);
  const nrows = Math.ceil((ymax - ymin) / resolution);
  const field: Array<Array<number>> = range(ncols).map((x) =>
    range(nrows).map((y) => (y / nrows) * Math.PI)
  );
  console.log({ ncols, nrows, field });

  new p5((s: Ip5) => {
    s.setup = () => {
      s.createCanvas(w, h);
      s.background(0);
    };

    const particles = field.flat().map((angle, i) => ({
      loc: [
        (i * resolution) / ncols + resolution / 2,
        (i % ncols) * resolution + resolution / 2,
      ],
      angle,
    }));

    s.draw = () => {
      s.push();
      s.fill(0, 40);
      s.noStroke();
      s.rect(0, 0, w, h);
      s.pop();

      s.push();
      s.fill(255);
      s.stroke(255);
      s.strokeWeight(3);
      particles.forEach(({ angle, loc: [x, y] }) => {
        s.line(x, y, x + 5 * s.cos(angle), y + 5 * s.sin(angle));
      });
      s.pop();
    };
  }, ref);
};

export default { ...meta, sketch };
