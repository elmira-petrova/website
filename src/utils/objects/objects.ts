export function isInstanceOf<T, Args extends unknown[]>(
  base: new (...args: Args) => T,
  derived: unknown,
): derived is T {
  return derived instanceof base;
}
