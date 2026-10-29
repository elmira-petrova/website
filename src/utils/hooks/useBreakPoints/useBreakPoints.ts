import { useMemo } from "react";
import { breakpoints } from "../../../constants/breakpoints";
import { useWindowSize } from "../useWindowSize/useWindowSize";

type Names = keyof typeof breakpoints;

type Matcher<T extends string> = { [key in T]: boolean };

type WidthUpKeys<Name extends string> = `widthUp${Name}`;
type WidthUpMather = Matcher<WidthUpKeys<Names>>;

type WidthDownKeys<Name extends string> = `widthDown${Name}`;
type WidthDownMather = Matcher<WidthDownKeys<Names>>;

type UseBreakPointsReturnType = {
  [key in Names as WidthUpKeys<key> | WidthDownKeys<key>]: boolean;
};

const BreakPointsNameList = Object.keys(breakpoints) as Names[];

export const useBreakPoints = (): UseBreakPointsReturnType => {
  const { innerWidth } = useWindowSize();

  const widthUp = useMemo<WidthUpMather>(() => {
    const matcher: WidthUpMather = {
      widthUpXS: false,
      widthUpSM: false,
      widthUpMD: false,
      widthUpLG: false,
      widthUpXL: false,
      widthUpXXL: false,
    };

    BreakPointsNameList.forEach((name) => {
      matcher[`widthUp${name}`] = innerWidth >= breakpoints[name];
    });
    return matcher;
  }, [innerWidth]);

  const widthDown = useMemo<WidthDownMather>(() => {
    const matcher: WidthDownMather = {
      widthDownXS: false,
      widthDownSM: false,
      widthDownMD: false,
      widthDownLG: false,
      widthDownXL: false,
      widthDownXXL: false,
    };

    BreakPointsNameList.forEach((name) => {
      matcher[`widthDown${name}`] = innerWidth < breakpoints[name];
    });
    return matcher;
  }, [innerWidth]);

  return { ...widthUp, ...widthDown };
};
