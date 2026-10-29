import React from "react";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { AppErrorFallback } from "./AppErrorFallback/AppErrorFallback";

export const AppErrorBoundary = (props: React.PropsWithChildren) => {
  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => (
        <AppErrorFallback {...fallbackProps} />
      )}
    >
      {props.children}
    </ErrorBoundary>
  );
};
