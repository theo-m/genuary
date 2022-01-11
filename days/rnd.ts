export const unif = (a: number, b: number) =>
  Math.min(a, b) + Math.abs(b - a) * Math.random();

export const unifctr = (c: number, r: number) => c - r + 2 * r * Math.random();

export const frame = (ref: HTMLDivElement) => {
  const cr = ref.parentElement?.getBoundingClientRect();
  return [Math.min(cr?.width ?? 400, 1400), Math.min(cr?.height ?? 600, 1400)];
};

export const range = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);

export const pcos = (n: number) => (Math.cos(n) + 1) / 2;

export const randomColor = (p?: { h?: number; alpha?: number }) =>
  `hsla(${p?.h ?? Math.floor(unif(0, 360))}, 30%, 80%, ${p?.alpha ?? 1})`;
