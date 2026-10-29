import React from "react";

export type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

export type UseResizeObserverParams = {
  onResize: (rect: ObserverRect) => void;
  options?: ResizeObserverOptions;
};

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  params: UseResizeObserverParams,
): { refCallback: React.RefCallback<T | null> } {
  const frameID = React.useRef(0);
  const observerRef = React.useRef<ResizeObserver | null>(null);
  const onResizeRef = React.useRef(params.onResize);
  onResizeRef.current = params.onResize;

  const refCallback: React.RefCallback<T | null> = React.useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }

      if (!node) {
        return;
      }

      observerRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          cancelAnimationFrame(frameID.current);
          frameID.current = requestAnimationFrame(() => {
            const boxSize =
              entry.borderBoxSize?.[0] || entry.contentBoxSize?.[0];

            let rect: ObserverRect;
            if (boxSize) {
              const width = boxSize.inlineSize;
              const height = boxSize.blockSize;
              rect = {
                width,
                height,
                x: entry.contentRect.x,
                y: entry.contentRect.y,
                top: entry.contentRect.top,
                left: entry.contentRect.left,
                bottom: entry.contentRect.bottom,
                right: entry.contentRect.right,
              };
            } else {
              rect = entry.contentRect;
            }

            onResizeRef.current(rect);
          });
        }
      });
      observerRef.current.observe(node, params.options);
    },
    [params.options],
  );

  return { refCallback } as const;
}
