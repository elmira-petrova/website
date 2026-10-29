import { z } from "zod";
import { getGlobalSingletonInstance } from "../utils/global/globalSingleton";
import { GLOBALS } from "../utils/global/constants";

const NEXT_PUBLIC_IS_SERVER = typeof window === "undefined";

const clientSideEnvSchema = z.object({
  isServer: z.literal(false),

  app: z.object({
    name: z.string(),
    revision: z.string(),
  }),

  // for development
  dev: z.object({}).optional(),
});

const serverSideEnvSchema = z.object({
  ...clientSideEnvSchema.shape,
  isServer: z.literal(true),
  SERVER_SIDE_ONLY: z.object({}),
});

export const envSchema = z.discriminatedUnion("isServer", [
  clientSideEnvSchema,
  serverSideEnvSchema,
]);

const getEnv = () =>
  envSchema.parse({
    isServer: NEXT_PUBLIC_IS_SERVER,
    app: {
      name: process.env.NEXT_PUBLIC_APP_NAME,
      revision: process.env.NEXT_PUBLIC_APP_REVISION,
    },

    SERVER_SIDE_ONLY: {},

    dev: process.env.NODE_ENV === "development" ? {} : undefined,
  });

export const getConfig = () => {
  const commonConfig = {
    ...getEnv(),
    contacts: {
      email: "elmirapetrova.collaboration@gmail.com",
      linkedin: "https://www.linkedin.com/in/elmira-petrova",
    },
    tests: {
      isTestRunning: Boolean(process.env.JEST_WORKER_ID),
    },
  };

  if (!commonConfig.isServer) {
    return commonConfig;
  }

  return {
    ...commonConfig,
    SERVER_SIDE_ONLY: {
      ...commonConfig.SERVER_SIDE_ONLY,
    },
  };
};

export type Config = ReturnType<typeof getConfig>;

export const Config = getGlobalSingletonInstance({
  key: GLOBALS.CONFIG,
  factory: getConfig,
});
