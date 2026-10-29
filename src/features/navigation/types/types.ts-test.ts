import {
  IsSomeRouteNotConst,
  NotExistingRoutes,
  RouterParamsWithInvalidValue,
} from "../utils/types/types";
import { Expect, IsNever, Not } from "../../../utils/types/types";
import {
  AllGeneratedParams,
  AllGeneratedPaths,
  RouterParams,
  RoutesType,
} from "../constants";

/** IF THERE IS AN ERROR - RUN "typegen" FIRST */

type StringRoutes = IsSomeRouteNotConst<RoutesType>;
type InvalidRouterParamsNames = RouterParamsWithInvalidValue<
  AllGeneratedPaths,
  RouterParams
>;
type MissingRouterParams = Exclude<AllGeneratedParams, keyof RouterParams>;
type NotExistingRoutesValues = NotExistingRoutes<
  RoutesType,
  AllGeneratedPaths | `${AllGeneratedPaths}/`
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _tests = [
  /* All the routes must be const and mustn't have 'string' type. */
  Expect<Not<StringRoutes>>,
  // Some of RouterParams values are invalid
  Expect<IsNever<InvalidRouterParamsNames>>,
  // There is a param missing in RouterParams
  Expect<IsNever<MissingRouterParams>>,
  // There's a missing page in src/pages
  Expect<IsNever<NotExistingRoutesValues>>,
];
