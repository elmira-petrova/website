import { DynamicOptions } from "next/dynamic";
import { ChunkLoadErrorBoundaryProps } from "../../../../components/errors/ChunkLoadErrorBoundary/ChunkLoadErrorBoundary";
import { LoadingWithChunkLoadErrorBoundary } from "./components/LoadingWithChunkLoadErrorBoundary/LoadingWithChunkLoadErrorBoundary";

/** usage:
const DynamicHeader = dynamic(
  () => import("../../"),
  {
    loading: getLoadingWithChunkLoadErrorBoundary({
      loading: (loadingProps) => {},
    }),
  },
);
*/
export const getLoadingWithChunkLoadErrorBoundary =
  (params: {
    loading?: DynamicOptions["loading"];
    ChunkLoadErrorBoundaryProps?: ChunkLoadErrorBoundaryProps;
  }): DynamicOptions["loading"] =>
  // eslint-disable-next-line react/display-name
  (loadingProps) => (
    <LoadingWithChunkLoadErrorBoundary
      loadingProps={loadingProps}
      ChunkLoadErrorBoundaryProps={params.ChunkLoadErrorBoundaryProps}
      renderLoading={params.loading}
    />
  );
