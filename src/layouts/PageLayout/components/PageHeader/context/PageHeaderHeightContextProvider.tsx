import React from "react";
import { PageHeaderHeightContext } from "./PageHeaderHeightContext";

export const PageHeaderHeightContextProvider = (
  props: React.PropsWithChildren,
) => {
  const [height, setHeight] = React.useState(0);

  const value = React.useMemo(
    () => ({
      height,
      setHeight,
    }),
    [height],
  );

  return (
    <PageHeaderHeightContext.Provider value={value}>
      {props.children}
    </PageHeaderHeightContext.Provider>
  );
};
