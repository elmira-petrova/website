import { useBreakPoints } from "../useBreakPoints/useBreakPoints";

const breakpointsList = [
  "widthUpXXL",
  "widthUpXL",
  "widthUpLG",
  "widthUpMD",
  "widthUpSM",
  "widthUpXS",
] as const;

export type UseMediaBreakpointUpParams<T> = {
  [key in (typeof breakpointsList)[number]]?: T;
} & { default: T };

export const useMediaBreakpointUp = <T>(
  params: UseMediaBreakpointUpParams<T>,
) => {
  const breakPoints = useBreakPoints();

  const maxUp = breakpointsList.find(
    (breakPoint) => breakPoints[breakPoint] && breakPoint in params,
  );

  if (!maxUp) return params.default;

  return params[maxUp] !== undefined ? params[maxUp] : params.default;
};
