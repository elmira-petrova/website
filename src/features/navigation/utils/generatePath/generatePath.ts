import { baseGeneratePath } from "./baseGeneratePath/baseGeneratePath";
import { RouterParams, RoutesType } from "../../constants";
import { TypedGeneratePath } from "./types/types";

export const generatePath = baseGeneratePath as TypedGeneratePath<
  RoutesType,
  RouterParams
>;
