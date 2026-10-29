import { GlobalAPI } from "./constants";

const GLOBAL_API_KEY = Symbol.for(`app.globals`);

type Global = {
  [GLOBAL_API_KEY]?: GlobalAPI;
};

declare const self: unknown;
declare const window: unknown;
declare const global: unknown;

const _global = (
  typeof globalThis === "object"
    ? globalThis
    : typeof self === "object"
      ? self
      : typeof window === "object"
        ? window
        : typeof global === "object"
          ? global
          : {}
) as Global;

export function getGlobal<Key extends keyof GlobalAPI>(
  key: Key,
): GlobalAPI[Key] {
  return _global[GLOBAL_API_KEY]?.[key];
}

export function registerGlobal<
  Key extends keyof GlobalAPI,
  Instance extends GlobalAPI[Key],
>(key: Key, instance: Instance, allowOverride = false) {
  const api = (_global[GLOBAL_API_KEY] = _global[GLOBAL_API_KEY] ?? {});

  if (!allowOverride && api[key]) {
    // already registered an API of this key
    throw new Error(`Globals: Attempted duplicate registration of API: ${key}`);
  }

  api[key] = instance;

  return instance;
}

export function unregisterGlobal(key: keyof GlobalAPI) {
  const api = _global[GLOBAL_API_KEY];

  if (api) {
    delete api[key];
  }
}
