import React from "react";
// eslint-disable-next-line no-restricted-imports
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps as ReactErrorBoundaryProps,
} from "react-error-boundary";
import { isError } from "../../../utils/errors/errors";

type ChunkLoadErrorBoundaryState = Readonly<
  (
    | {
        isFirstTime: boolean;
        errorStorageKey: string;
      }
    | { isFirstTime?: undefined }
  ) &
    ReactErrorBoundary["state"]
>;

export type ChunkLoadErrorBoundaryProps = ReactErrorBoundaryProps;

export class ChunkLoadErrorBoundary extends ReactErrorBoundary {
  declare readonly props: Readonly<ChunkLoadErrorBoundaryProps>;
  declare state: ChunkLoadErrorBoundaryState;

  static getUrlFromErrorMessage(message: string): string | undefined {
    return (
      /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)*([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/.exec(
        message,
      )?.[0] ?? undefined
    );
  }

  static getChunkUrl(error: Error): string {
    let chunkUrl;
    if ("request" in error && error.request) {
      chunkUrl = String(error.request);
    } else {
      chunkUrl = this.getUrlFromErrorMessage(error.message);
    }

    return chunkUrl || "";
  }

  static getErrorStorageKey(chunkUrl: string) {
    return `ChunkLoadError__${chunkUrl}`;
  }

  static isChunkLoadError(maybeError: unknown): maybeError is Error {
    if (!isError(maybeError)) return false;
    return (
      maybeError.name === "ChunkLoadError" ||
      /Loading chunk \d+ failed/.test(maybeError.message) ||
      /Failed to fetch dynamically imported module/i.test(maybeError.message)
    );
  }

  static getDerivedStateFromError =
    // arrow function fixes losing 'this', because React calls it detached from the class
    (error: Error) => {
      if (!ChunkLoadErrorBoundary.isChunkLoadError(error)) throw error;

      const chunkUrl = this.getChunkUrl(error);

      const errorStorageKey = this.getErrorStorageKey(chunkUrl);

      const isFirstTime = !window.sessionStorage.getItem(errorStorageKey);

      return {
        ...super.getDerivedStateFromError(error),
        isFirstTime,
        errorStorageKey,
      };
    };

  render() {
    // skip rendering fallback while the page is reloading
    if (this.state.didCatch && this.state.isFirstTime) return <></>;

    return super.render();
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    super.componentDidCatch(error, info);

    if (!this.state.isFirstTime) return;

    window.sessionStorage.setItem(this.state.errorStorageKey, "1");
    window.location.reload();
  }
}
