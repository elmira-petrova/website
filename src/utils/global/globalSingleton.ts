import { GlobalAPI } from "./constants";
import { getGlobal, registerGlobal } from "./global";

/*
  Because the same class can be bundled into different chunks
  we can't rely on normal singleton pattern
*/

export const getGlobalSingletonInstance = <
  Key extends keyof GlobalAPI,
  Instance extends GlobalAPI[Key],
>(params: {
  key: Key;
  factory: () => Instance;
  allowOverride?: boolean;
}) => {
  const registeredGlobal = getGlobal(params.key);

  if (registeredGlobal) return registeredGlobal;

  return registerGlobal(params.key, params.factory(), params.allowOverride);
};
