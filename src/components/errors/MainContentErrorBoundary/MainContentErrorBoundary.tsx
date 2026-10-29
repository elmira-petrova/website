import React from "react";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { AppErrorFallback } from "../AppErrorBoundary/AppErrorFallback/AppErrorFallback";
import { useRouter } from "../../../features/navigation/hooks/useRouter/useRouter";

export const MainContentErrorBoundary = (props: React.PropsWithChildren) => {
  const router = useRouter();

  return (
    <ErrorBoundary
      key={router.pathname}
      fallbackRender={(fallbackProps) => (
        <AppErrorFallback {...fallbackProps} />
      )}
    >
      {props.children}
    </ErrorBoundary>
  );
};
