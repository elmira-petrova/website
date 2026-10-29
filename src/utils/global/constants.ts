import type { Config } from "../../constants/config";

export enum GLOBALS {
  CONFIG = "CONFIG",
}

export type GlobalAPI = Partial<{
  [GLOBALS.CONFIG]: Config;
}>;
