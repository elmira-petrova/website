import React from "react";
import { cn, commonCss } from "../../../../utils/styles/styles";
import { roundTo } from "../../../../utils/numbers/numbers";
import { throttle } from "../../../../utils/functions/functions";
import { createInterpolation } from "../../../../utils/interpolation/interpolation";
import { useResizeObserver } from "../../../../utils/hooks/useResizeObserver/useResizeObserver";
import { usePageHeaderHeightContext } from "./context/usePageHeaderHeightContext";
import { PageHeaderContentMobile } from "./PageHeaderContentMobile/PageHeaderContentMobile";
import { PageHeaderContentDesktop } from "./PageHeaderContentDesktop/PageHeaderContentDesktop";

import css from "./PageHeader.module.scss";

const defaultShadowStyle = { opacity: 0 };

export const PageHeader = React.memo(() => {
  const pageHeaderHeightContext = usePageHeaderHeightContext();
  const [shadowStyle, setShadowStyle] = React.useState(defaultShadowStyle);

  const resizeObserver = useResizeObserver({
    onResize: (rect) => pageHeaderHeightContext.setHeight(rect.height),
  });

  React.useLayoutEffect(() => {
    const propertyName = "--app-header-height";

    document.documentElement.style.setProperty(
      propertyName,
      `${pageHeaderHeightContext.height}px`,
    );

    return () => {
      document.documentElement.style.removeProperty(propertyName);
    };
  }, [pageHeaderHeightContext.height]);

  React.useEffect(() => {
    // header animation on scroll
    const interpolation = createInterpolation({
      inputRange: [0, 20],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const scrollHandler = () => {
      const { scrollY } = window;
      const opacity = roundTo(interpolation(scrollY), 2);
      setShadowStyle((prevState) =>
        prevState.opacity !== opacity ? { opacity } : prevState,
      );
    };

    // initial set up
    scrollHandler();

    const listener = throttle(scrollHandler, 64);

    window.addEventListener("scroll", listener, { passive: true });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [pageHeaderHeightContext.height]);

  return (
    <header ref={resizeObserver.refCallback} className={css.container}>
      <div className={cn(css.shadow)} style={shadowStyle} />

      <div className={cn(commonCss.contentContainer, css.contentContainer)}>
        <PageHeaderContentMobile />
      </div>
      <div
        className={cn(
          commonCss.contentContainer,
          css.contentContainer,
          css.contentContainer_desktop,
        )}
      >
        <PageHeaderContentDesktop />
      </div>
    </header>
  );
});
PageHeader.displayName = "PageHeader";
