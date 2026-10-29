import { ParamMap } from "../../../.next/types/routes";
import { RecursiveValues, UnionToIntersection } from "../../utils/types/types";
import { ParamsDict } from "./utils/types/types";
import { ProjectIds } from "../entities/projects/types";

/** IF THERE IS AN ERROR - RUN "typegen" FIRST */

export type AllGeneratedPaths = keyof ParamMap;
export type AllGeneratedParams = keyof UnionToIntersection<
  ParamMap[keyof ParamMap]
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type RouterParams = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RouterParamsDict = {} as const satisfies ParamsDict<
  AllGeneratedPaths,
  AllGeneratedParams
>;

const PROJECTS = "/projects";

const PublicRoutes = {
  HOME: "/",
  PAGE_404: "/404",
  ABOUT: "/about",
  PROJECTS,
  COFFEE_DISTRICT: `${PROJECTS}/${ProjectIds.CoffeeDistrict}`,
} as const;

const AuthRoutes = {} as const;

export const Routes = {
  PublicRoutes,
  AuthRoutes,
} as const;

export type RoutesType = RecursiveValues<typeof Routes>;
