import React from "react";

export const PageHeaderHeightContext = React.createContext<{
  height: number;
  setHeight: (height: number) => void;
}>({ height: 0, setHeight: () => {} });
