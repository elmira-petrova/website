import { Route } from "next";
import { FindParamsInPath } from "../../types/types";

export type TypedGeneratePath<
  PassedPath extends string,
  PassedRouterParamsType extends object,
> = <Path extends PassedPath, RouterParamsType extends PassedRouterParamsType>(
  pathname: Path,
  ...args: FindParamsInPath<Path> extends never
    ? [Partial<RouterParamsType>?]
    : [
        Pick<
          RouterParamsType,
          FindParamsInPath<Path> extends keyof RouterParamsType
            ? FindParamsInPath<Path>
            : never
        >,
      ]
) => Route<Path>;
