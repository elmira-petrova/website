import { Equal, Expect, IsNever, Not } from "../../../../utils/types/types";
import {
  CatchAllOptionalParam,
  CatchAllOptionalParamValue,
  CatchAllParam,
  CatchAllParamValue,
  DynamicParam,
  DynamicParamValue,
  FindParamsInPath,
  GetParamSegment,
  GetParamValidValue,
  IsCatchAllOptionalParam,
  IsCatchAllParam,
  IsSomeRouteNotConst,
  NotExistingRoutes,
  ParamsDict,
  RouterParamsWithInvalidValue,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _IsCatchAllOptionalParam = [
  Expect<IsCatchAllOptionalParam<"/shop/[[...slug]]", "slug">>,
  Expect<Not<IsCatchAllOptionalParam<"/shop/[[...slug]]", "slug1">>>,
  Expect<IsCatchAllOptionalParam<"/[[...slug]]", "slug">>,
  Expect<IsCatchAllOptionalParam<"/[[...slug]]/", "slug">>,
  Expect<IsCatchAllOptionalParam<"/shop/[[...slug]]/", "slug">>,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _IsCatchAllParam = [
  Expect<IsCatchAllParam<"/shop/[...slug]", "slug">>,
  Expect<Not<IsCatchAllParam<"/shop/[...slug]", "slug1">>>,
  Expect<Not<IsCatchAllParam<"/shop/[[...slug]]", "slug">>>,
  Expect<IsCatchAllParam<"/[...slug]", "slug">>,
  Expect<IsCatchAllParam<"/[...slug]/", "slug">>,
  Expect<IsCatchAllParam<"/shop/[...slug]/", "slug">>,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _IsSomeRouteNotConst = [
  Expect<Not<IsSomeRouteNotConst<"/" | "/user/my">>>,
  Expect<IsSomeRouteNotConst<"/" | string>>,
  Expect<IsSomeRouteNotConst<"/" | `${string}`>>,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _NotExistingRoutes = [
  Expect<
    IsNever<
      NotExistingRoutes<
        "/path" | "/path/" | "notExistingRoute",
        "/path" | "/path/" | "notExistingRoute"
      >
    >
  >,
  Expect<
    Not<
      IsNever<
        NotExistingRoutes<
          "/path" | "/path/" | "notExistingRoute",
          "/path" | "/path/"
        >
      >
    >
  >,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _FindParamsInPath = [
  Expect<Equal<FindParamsInPath<"/blog/[slug]">, "slug">>,
  Expect<Not<Equal<FindParamsInPath<"/blog/[slug]">, "slug1">>>,
  Expect<Equal<FindParamsInPath<"/blog/[slug]/a">, "slug">>,

  Expect<Equal<FindParamsInPath<"/blog/[...slug]">, "slug">>,
  Expect<Not<Equal<FindParamsInPath<"/blog/[...slug]">, "slug1">>>,
  Expect<Equal<FindParamsInPath<"/blog/[...slug]/a">, "slug">>,

  Expect<Equal<FindParamsInPath<"/blog/[[...slug]]">, "slug">>,
  Expect<Not<Equal<FindParamsInPath<"/blog/[[...slug]]">, "slug1">>>,
  Expect<Equal<FindParamsInPath<"/blog/[[...slug]]/a">, "slug">>,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _GetParamValidValue = [
  Expect<Equal<GetParamValidValue<"/blog/[slug]", "slug">, DynamicParamValue>>,
  Expect<
    Not<Equal<GetParamValidValue<"/blog/[slug]", "slug">, CatchAllParamValue>>
  >,
  Expect<
    Not<
      Equal<
        GetParamValidValue<"/blog/[slug]", "slug">,
        CatchAllOptionalParamValue
      >
    >
  >,

  Expect<
    Not<Equal<GetParamValidValue<"/blog/[...slug]", "slug">, DynamicParamValue>>
  >,
  Expect<
    Equal<GetParamValidValue<"/blog/[...slug]", "slug">, CatchAllParamValue>
  >,
  Expect<
    Not<
      Equal<
        GetParamValidValue<"/blog/[...slug]", "slug">,
        CatchAllOptionalParamValue
      >
    >
  >,

  Expect<
    Not<
      Equal<GetParamValidValue<"/blog/[[...slug]]", "slug">, DynamicParamValue>
    >
  >,
  Expect<
    Not<
      Equal<GetParamValidValue<"/blog/[[...slug]]", "slug">, CatchAllParamValue>
    >
  >,
  Expect<
    Equal<
      GetParamValidValue<"/blog/[[...slug]]", "slug">,
      CatchAllOptionalParamValue
    >
  >,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _RouterParamsWithInvalidValue = [
  Expect<
    IsNever<RouterParamsWithInvalidValue<"/blog/[slug]", { slug: string }>>
  >,
  Expect<
    Not<
      IsNever<
        RouterParamsWithInvalidValue<
          "/blog/[slug]",
          { slug: string | undefined }
        >
      >
    >
  >,

  Expect<
    IsNever<
      RouterParamsWithInvalidValue<
        "/blog/[...catchAll]",
        { catchAll: string[] }
      >
    >
  >,
  Expect<
    Not<
      IsNever<
        RouterParamsWithInvalidValue<
          "/blog/[...catchAll]",
          { catchAll: string }
        >
      >
    >
  >,
  Expect<
    Not<
      IsNever<
        RouterParamsWithInvalidValue<
          "/blog/[...catchAll]",
          { catchAll: (string | undefined)[] }
        >
      >
    >
  >,

  Expect<
    IsNever<
      RouterParamsWithInvalidValue<
        "/blog/[[...catchAllOptional]]",
        { catchAllOptional: string[] }
      >
    >
  >,
  Expect<
    IsNever<
      RouterParamsWithInvalidValue<
        "/blog/[[...catchAllOptional]]",
        { catchAllOptional: undefined }
      >
    >
  >,
  Expect<
    Not<
      IsNever<
        RouterParamsWithInvalidValue<
          "/blog/[[...catchAllOptional]]",
          { catchAllOptional: string }
        >
      >
    >
  >,
  Expect<
    Not<
      IsNever<
        RouterParamsWithInvalidValue<
          "/blog/[[...catchAllOptional]]",
          { catchAllOptional: (string | undefined)[] }
        >
      >
    >
  >,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _GetParamSegment = [
  Expect<
    Equal<
      GetParamSegment<
        | "/blog/[slug]"
        | "/blog/[...catchAll]"
        | "/blog/[[...catchAllOptional]]",
        "slug"
      >,
      DynamicParam<"slug">
    >
  >,
  Expect<
    Equal<
      GetParamSegment<
        | "/blog/[slug]"
        | "/blog/[...catchAll]"
        | "/blog/[[...catchAllOptional]]",
        "catchAll"
      >,
      CatchAllParam<"catchAll">
    >
  >,
  Expect<
    Equal<
      GetParamSegment<
        | "/blog/[slug]"
        | "/blog/[...catchAll]"
        | "/blog/[[...catchAllOptional]]",
        "catchAllOptional"
      >,
      CatchAllOptionalParam<"catchAllOptional">
    >
  >,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _ParamsDict = [
  Expect<
    Equal<
      ParamsDict<
        | "/blog/[slug]"
        | "/blog/[...catchAll]"
        | "/blog/[[...catchAllOptional]]",
        "slug" | "catchAll" | "catchAllOptional"
      >,
      {
        slug: DynamicParam<"slug">;
        catchAll: CatchAllParam<"catchAll">;
        catchAllOptional: CatchAllOptionalParam<"catchAllOptional">;
      }
    >
  >,
  Expect<
    Not<
      Equal<
        ParamsDict<
          | "/blog/[slug]"
          | "/blog/[...catchAll]"
          | "/blog/[[...catchAllOptional]]",
          "slug" | "catchAll" | "catchAllOptional"
        >,
        {
          catchAll: CatchAllParam<"catchAll">;
          catchAllOptional: CatchAllOptionalParam<"catchAllOptional">;
        }
      >
    >
  >,
  Expect<
    Not<
      Equal<
        ParamsDict<
          | "/blog/[slug]"
          | "/blog/[...catchAll]"
          | "/blog/[[...catchAllOptional]]",
          "slug" | "catchAll" | "catchAllOptional"
        >,
        {
          slug: DynamicParam<"slug">;
          catchAllOptional: CatchAllOptionalParam<"catchAllOptional">;
        }
      >
    >
  >,
  Expect<
    Not<
      Equal<
        ParamsDict<
          | "/blog/[slug]"
          | "/blog/[...catchAll]"
          | "/blog/[[...catchAllOptional]]",
          "slug" | "catchAll" | "catchAllOptional"
        >,
        {
          slug: DynamicParam<"slug">;
          catchAll: CatchAllParam<"catchAll">;
        }
      >
    >
  >,
];
