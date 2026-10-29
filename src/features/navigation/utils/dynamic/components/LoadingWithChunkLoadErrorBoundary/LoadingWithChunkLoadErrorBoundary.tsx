import { DynamicOptions, DynamicOptionsLoadingProps } from "next/dynamic";
import {
  ChunkLoadErrorBoundary,
  ChunkLoadErrorBoundaryProps,
} from "../../../../../../components/errors/ChunkLoadErrorBoundary/ChunkLoadErrorBoundary";
import { ThrowOnError } from "../../../../../../components/errors/ThrowOnError/ThrowOnError";

type LoadingWithChunkLoadErrorBoundaryProps = {
  loadingProps: DynamicOptionsLoadingProps;
  renderLoading?: DynamicOptions["loading"];
  ChunkLoadErrorBoundaryProps?: ChunkLoadErrorBoundaryProps;
};
export const LoadingWithChunkLoadErrorBoundary = (
  props: LoadingWithChunkLoadErrorBoundaryProps,
) => {
  const chunkLoadErrorBoundaryProps = (() => {
    let result = { ...props.ChunkLoadErrorBoundaryProps };

    if (
      !("fallbackRender" in result) &&
      !("FallbackComponent" in result) &&
      !("fallback" in result)
    ) {
      result = { ...result, fallbackRender: ThrowOnError };
    }

    return result as ChunkLoadErrorBoundaryProps;
  })();

  return (
    <ChunkLoadErrorBoundary {...chunkLoadErrorBoundaryProps}>
      <ThrowOnError error={props.loadingProps.error} />

      {props.renderLoading?.(props.loadingProps)}
    </ChunkLoadErrorBoundary>
  );
};
