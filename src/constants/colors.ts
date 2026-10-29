import { z } from "zod";
import colors from "../styles/colors.module.scss";

const colorsSchema = z.object({
  BG: z.string(),
});

export const Colors = colorsSchema.parse(colors);
