import { z } from "zod";
import variables from "../styles/breakpoints.module.scss";

const breakpointsSchema = z.object({
  XS: z.number(),
  SM: z.number(),
  MD: z.number(),
  LG: z.number(),
  XL: z.number(),
  XXL: z.number(),
});

export const breakpoints = breakpointsSchema.parse(
  Object.fromEntries(
    Object.entries(variables).map((breakPointEntry) => [
      breakPointEntry[0],
      parseInt(breakPointEntry[1], 10),
    ]),
  ),
);
