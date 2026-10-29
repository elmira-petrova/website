import {
  useMediaBreakpointUp,
  type UseMediaBreakpointUpParams,
} from "./useMediaBreakpointUp";

export type MediaBreakpointUpProps<T> = {} & UseMediaBreakpointUpParams<T>;

export const MediaBreakpointUp = <T,>(props: MediaBreakpointUpProps<T>) => {
  return useMediaBreakpointUp(props);
};
