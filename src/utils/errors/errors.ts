import { isInstanceOf } from "../objects/objects";

type ErrorConstructor<T extends Error> = new (
  ...args: ConstructorParameters<typeof Error>
) => T;

export function isInstanceOfError<T extends Error>(
  base: ErrorConstructor<T>,
  derived: unknown,
): derived is T {
  return isInstanceOf(base, derived);
}

export function isError(maybeError: unknown): maybeError is Error {
  switch (Object.prototype.toString.call(maybeError)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return true;
    default:
      return isInstanceOfError(Error, maybeError);
  }
}
