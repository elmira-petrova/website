export const roundTo = (
  value: number,
  precision: number,
  method: "round" | "ceil" | "floor" = "round",
) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math[method](value * multiplier) / multiplier;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
