import { ConditionalKeys, Equal, Extends } from "../../../../utils/types/types";

export type DynamicParam<ParamName extends string> = `[${ParamName}]`;
export type CatchAllParam<ParamName extends string> = `[...${ParamName}]`;
export type CatchAllOptionalParam<ParamName extends string> =
  `[${CatchAllParam<ParamName>}]`;

type PathWithParam<ParamName extends string> = `${string}${ParamName}${string}`;

export type IsCatchAllOptionalParam<
  Path extends string,
  ParamName extends string,
> = Path extends PathWithParam<CatchAllOptionalParam<ParamName>> ? true : false;

export type IsCatchAllParam<Path extends string, ParamName extends string> =
  Path extends PathWithParam<CatchAllOptionalParam<ParamName>>
    ? false
    : Path extends PathWithParam<CatchAllParam<ParamName>>
      ? true
      : false;

export type DynamicParamValue = string | number;
export type CatchAllParamValue = DynamicParamValue[];
export type CatchAllOptionalParamValue = CatchAllParamValue | undefined;

export type GetParamValidValue<Path extends string, ParamName extends string> =
  IsCatchAllOptionalParam<Path, ParamName> extends false
    ? IsCatchAllParam<Path, ParamName> extends false
      ? DynamicParamValue
      : CatchAllParamValue
    : CatchAllOptionalParamValue;

export type RouterParamsWithInvalidValue<
  Paths extends string,
  RouterParams extends object,
> = Exclude<
  keyof RouterParams,
  ConditionalKeys<
    {
      [paramName in Extract<keyof RouterParams, string>]: Extends<
        RouterParams[paramName],
        GetParamValidValue<Paths, paramName>
      >;
    },
    true
  >
>;

export type FindParamsInPath<Path extends string> =
  Path extends `${infer L}/${infer R}`
    ? FindParamsInPath<L> | FindParamsInPath<R>
    : Path extends CatchAllOptionalParam<infer CatchAllOptional>
      ? CatchAllOptional
      : Path extends CatchAllParam<infer CatchAll>
        ? CatchAll
        : Path extends DynamicParam<infer Param>
          ? Param
          : never;

export type GetParamSegment<Path extends string, ParamName extends string> =
  IsCatchAllOptionalParam<Path, ParamName> extends false
    ? IsCatchAllParam<Path, ParamName> extends false
      ? DynamicParam<ParamName>
      : CatchAllParam<ParamName>
    : CatchAllOptionalParam<ParamName>;

export type ParamsDict<Path extends string, ParamName extends string> = {
  [paramName in ParamName]: GetParamSegment<Path, paramName>;
};

export type NotExistingRoutes<
  Paths extends string,
  AllGeneratedPaths extends string,
> = Exclude<Paths, AllGeneratedPaths>;

export type IsSomeRouteNotConst<Routes extends string> = Equal<Routes, string>;
