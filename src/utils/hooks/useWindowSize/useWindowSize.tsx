import React from "react";
import { WindowSizeContext } from "./context";

export const useWindowSize = () => {
  return React.useContext(WindowSizeContext);
};
