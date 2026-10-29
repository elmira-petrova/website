/* Do not use. It's only for tests */
export const baseGeneratePath = (
  pathname: string,
  routeParams: NodeJS.Dict<
    | string
    | string[]
    | number
    | number[]
    | (string | number)[]
    | null
    | undefined
  >,
) => {
  // Replace slugs
  const asPath = pathname.replace(/\[{1,2}(.+?)]{1,2}/g, ($0, slug: string) => {
    if (slug.startsWith("...")) slug = slug.replace("...", "");

    const value = routeParams[slug];

    if (Array.isArray(value)) {
      return value.map((v) => encodeURIComponent(v)).join("/");
    }
    return value !== undefined ? encodeURIComponent(String(value)) : "";
  });

  // Remove any trailing slashes; this can occur if there is no match for a catch-all slug ([[...slug]])
  return normalizeTrailingSlash(asPath);
};

function normalizeTrailingSlash(path: string) {
  return path.endsWith("/") && path.length > 1
    ? path.slice(0, -1)
    : path || "/";
}
