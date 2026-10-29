import React from "react";
import { useRouter } from "../../hooks/useRouter/useRouter";
import { PathPatternContext as PathPatternContext1 } from "./PathPatternContext";

export const PathPatternProvider = (props: React.PropsWithChildren) => {
  const router = useRouter();

  return (
    <PathPatternContext1 value={router.pathname}>
      {props.children}
    </PathPatternContext1>
  );
};
