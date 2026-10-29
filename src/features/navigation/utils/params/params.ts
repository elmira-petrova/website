import { z } from "zod";

export const numericQueryParamSchema = z
  .string()
  .min(1)
  .pipe(z.coerce.number())
  .or(z.number());

export const queryParamErrorDecorator = <T extends z.ZodType>(schema: T) =>
  schema.optional().catch((ctx) => {
    console.error(ctx.error);
    return undefined;
  });

export const getSafeQueryParamsSchema = <Shape extends z.core.$ZodLooseShape>(
  shape: Shape,
) => {
  return Object.fromEntries(
    Object.entries(shape).map(([key, value]) => [
      key,
      queryParamErrorDecorator(value),
    ]),
  ) as {
    [key in keyof Shape]: ReturnType<
      typeof queryParamErrorDecorator<Shape[key]>
    >;
  };
};
