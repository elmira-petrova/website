import React from "react";
// eslint-disable-next-line no-restricted-imports
import { useParams } from "next/navigation";
import { z } from "zod";
import { ParsedUrlQueryInput } from "querystring";
import { getSafeQueryParamsSchema } from "../../utils/params/params";

export const pathParamsSchema = z.object(getSafeQueryParamsSchema({}));

export const usePathParams = <Schema extends z.ZodType<ParsedUrlQueryInput>>(
  schema: Schema,
) => {
  const _UNSAFE_PARAMS = useParams();

  return {
    _UNSAFE_PARAMS,
    pathParams: React.useMemo<Partial<z.core.output<Schema>>>(() => {
      const res = schema.safeParse(_UNSAFE_PARAMS);

      if (!res.success) return {};
      return res.data;
    }, [_UNSAFE_PARAMS, schema]),
  };
};
