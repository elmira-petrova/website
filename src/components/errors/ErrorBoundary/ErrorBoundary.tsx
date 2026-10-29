// eslint-disable-next-line no-restricted-imports
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps as ReactErrorBoundaryProps,
} from "react-error-boundary";

type ErrorBoundaryProps = {} & ReactErrorBoundaryProps;

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const onError: ErrorBoundaryProps["onError"] = (error, info) => {
    console.error(error);
    props.onError?.(error, info);
  };

  return <ReactErrorBoundary {...props} onError={onError} />;
};
