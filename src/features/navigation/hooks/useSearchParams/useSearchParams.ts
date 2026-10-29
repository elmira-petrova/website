import React from "react";
/* eslint-disable no-restricted-imports */
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams as nextUseSearchParams,
} from "next/navigation";
/* eslint-enable no-restricted-imports */
import { z } from "zod";
import { ParsedUrlQueryInput } from "querystring";
import {
  getSafeQueryParamsSchema,
  numericQueryParamSchema,
} from "../../utils/params/params";
import { useRouter } from "../useRouter/useRouter";

export const searchParamsSchema = z.object(
  getSafeQueryParamsSchema({
    page: numericQueryParamSchema.pipe(z.number().int().min(1)),
    code: z.string(),
  }),
);

export type ValidSearchParams = z.infer<typeof searchParamsSchema>;

export const useSearchParams = <Schema extends z.ZodType<ParsedUrlQueryInput>>(
  schema: Schema,
) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const _UNSAFE_URL_SEARCH_PARAMS =
    nextUseSearchParams() as ReadonlyURLSearchParams | null;

  const validSearchParams = React.useMemo<
    Partial<z.core.output<Schema>>
  >(() => {
    if (!_UNSAFE_URL_SEARCH_PARAMS) return {};

    const params = Object.fromEntries(_UNSAFE_URL_SEARCH_PARAMS.entries());

    const res = schema.safeParse(params);

    if (!res.success) return {};
    return res.data;
  }, [_UNSAFE_URL_SEARCH_PARAMS, schema]);

  const pathnameRef = React.useRef(pathname);
  pathnameRef.current = pathname;
  const queryRef = React.useRef(validSearchParams);
  queryRef.current = validSearchParams;

  const setSearchParams = React.useCallback(
    (
      query: typeof validSearchParams,
      options?: { shallow?: boolean; scroll?: boolean },
    ) => {
      const newQuery = { ...queryRef.current, ...query };

      for (const key in newQuery) {
        const value = newQuery[key as keyof typeof newQuery];
        if (value === null || value === undefined) {
          delete newQuery[key as keyof typeof newQuery];
        }
      }

      return replace(
        { pathname: pathnameRef.current, query: newQuery },
        undefined,
        {
          shallow: true,
          ...options,
        },
      );
    },
    [replace],
  );

  return {
    _UNSAFE_URL_SEARCH_PARAMS,
    searchParams: validSearchParams,
    setSearchParams,
  };
};
