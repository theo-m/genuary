export const unif = (a: number, b: number) =>
  Math.min(a, b) + Math.abs(b - a) * Math.random();

export const unifctr = (c: number, r: number) => c - r + 2 * r * Math.random();

export const frame = (ref: HTMLDivElement) => {
  const cr = ref.parentElement?.getBoundingClientRect();
  return [cr?.width ?? 400, cr?.height ?? 600];
};
