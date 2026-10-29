// eslint-disable-next-line no-restricted-imports
export type {
  DistributedOmit,
  Tagged as Brand,
  Simplify as Prettify,
  UnionToIntersection,
  IsNever,
  ConditionalKeys,
} from "type-fest";
// eslint-disable-next-line no-restricted-imports
export type { Expect, Equal, ExpectFalse as Not } from "type-testing";
// eslint-disable-next-line no-restricted-imports
export {
  isFiniteNumber,
  isNull,
  isBoolean,
  isArray,
  isArrayOf,
} from "@sindresorhus/is";

export type RecursiveValues<T> = {
  [Prop in keyof T]: T[Prop] extends Record<string, unknown>
    ? RecursiveValues<T[Prop]>
    : T[Prop];
}[keyof T];

export type Extends<A, B> = A extends B ? true : false;
