import { TypedGeneratePath } from "./types";

declare const f: TypedGeneratePath<
  | "/"
  | "/blog/[slug]"
  | "/blog/[...catchAll]"
  | "/blog/[[...catchAllOptional]]",
  {
    slug: string;
    catchAll: [string, number];
    catchAllOptional: (string | number)[] | undefined;
  }
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _f = [
  () => f("/"),
  () => f("/", {}),
  () => f("/", { slug: "" }),
  // @ts-expect-error invalid path
  () => f("/wrong"),
  () => f("/blog/[slug]", { slug: "" }),
  // @ts-expect-error invalid path and param name
  () => f("/blog/[sluG]", { sluG: "" }),
  // @ts-expect-error missing params
  () => f("/blog/[slug]"),
  // @ts-expect-error missing param
  () => f("/blog/[slug]", {}),
  // @ts-expect-error invalid param name
  () => f("/blog/[slug]", { sluG: 0 }),
  // @ts-expect-error invalid param type
  () => f("/blog/[slug]", { slug: 0 }),
  () => f("/blog/[...catchAll]", { catchAll: ["", 0] }),
  // @ts-expect-error invalid param name
  () => f("/blog/[...catchAll]", { catchAlL: ["", 0] }),
  // @ts-expect-error invalid param type
  () => f("/blog/[...catchAll]", { catchAll: [""] }),
  () => f("/blog/[[...catchAllOptional]]", { catchAllOptional: ["", 0] }),
  // @ts-expect-error invalid param name
  () => f("/blog/[[...catchAllOptional]]", { catchAllOptionalL: ["", 0] }),
  // @ts-expect-error invalid param type
  () => f("/blog/[[...catchAllOptional]]", { catchAllOptional: [null] }),
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare const f2: TypedGeneratePath<"/", {}>;
declare const f3: TypedGeneratePath<"/", object>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _f2_f3 = [
  () => f2("/"),
  () => f3("/"),
  () => f2("/", {}),
  () => f3("/", {}),
  () => f2("/", { slug: "" }),
  () => f3("/", { slug: "" }),
  // @ts-expect-error invalid path
  () => f2("/wrong"),
  // @ts-expect-error invalid path
  () => f3("/wrong"),
];
