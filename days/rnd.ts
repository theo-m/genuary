export const unif = (a: number, b: number) =>
  Math.min(a, b) + Math.abs(b - a) * Math.random();

export const unifctr = (c: number, r: number) => c - r + 2 * r * Math.random();
