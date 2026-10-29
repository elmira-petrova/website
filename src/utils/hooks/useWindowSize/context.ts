import React from "react";

export type WindowSize = Pick<Window, "innerWidth" | "innerHeight">;

export const defaultWindowSize = {
  innerWidth: 0,
  innerHeight: 0,
};

export const WindowSizeContext =
  React.createContext<WindowSize>(defaultWindowSize);
