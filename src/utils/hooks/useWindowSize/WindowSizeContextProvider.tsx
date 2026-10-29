import React, { useState } from "react";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";
import { debounce } from "../../functions/functions";
import {
  defaultWindowSize,
  type WindowSize,
  WindowSizeContext,
} from "./context";

const getWindowSize = () => {
  if (typeof window === "undefined") return defaultWindowSize;
  return { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
};

type WindowSizeContextProviderProps = {
  children?: React.ReactNode;
};

export const WindowSizeContextProvider = (
  props: WindowSizeContextProviderProps,
) => {
  const { children } = props;

  const [windowSize, setWindowSize] = useState<WindowSize>(defaultWindowSize);

  useEnhancedEffect(() => {
    setWindowSize(getWindowSize());

    const listener = debounce(() => {
      setWindowSize(getWindowSize());
    }, 16);

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};
