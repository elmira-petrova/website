import React from "react";
import { cn } from "../../../../../../utils/styles/styles";
import { Icons } from "../../../../../../components/Icons/Icons";
import { MaskedIcon } from "../../../../../../components/Icons/MaskedIcon/MaskedIcon";
import { Link } from "../../../../../../components/ui/links/Link/Link";
import { ButtonLink } from "../../../../../../components/ui/links/ButtonLink/ButtonLink";
import { throttle } from "../../../../../../utils/functions/functions";
import { Routes } from "../../../../../../features/navigation/constants";

import css from "./Aside.module.scss";

export type AsideProps<Sections extends string> = {
  sections: { [K in Sections]: { id: K; title: string } };
  sectionRefs: React.RefObject<{
    [key in Sections]: HTMLElement | null;
  }>;
};

export const Aside = <Sections extends string>(props: AsideProps<Sections>) => {
  const [currentSectionId, setCurrentSectionId] = React.useState<Sections>();
  const [indicatorStyle, setIndicatorStyle] = React.useState(
    defaultIndicatorStyle,
  );

  const navItemRefs = React.useRef({ ...props.sectionRefs.current });

  const clickedTimerId = React.useRef<ReturnType<typeof setTimeout>>(null);

  const asideSections = React.useMemo(
    () => Object.keys(props.sections) as Array<Sections>,
    [props.sections],
  );

  const scrollToSection = (el: HTMLElement | null) => {
    el?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getOnNavLinkClick = (sectionId: Sections) => () => {
    if (clickedTimerId.current) clearTimeout(clickedTimerId.current);
    clickedTimerId.current = setTimeout(() => {
      clickedTimerId.current = null;
    }, 1000);
    scrollToSection(props.sectionRefs.current[sectionId]);
    setCurrentSectionId(sectionId);
  };

  React.useEffect(() => {
    const scrollHandler = () => {
      if (clickedTimerId.current !== null) return;

      const scrollContainer = document.documentElement;
      const bound = scrollContainer.clientHeight * 0.3;
      const threshold = scrollContainer.scrollTop + bound;

      const isScrolledToBottom =
        scrollContainer.scrollHeight -
          scrollContainer.scrollTop -
          scrollContainer.clientHeight <
        1;

      const lastIndex = asideSections.length - 1;

      if (isScrolledToBottom) {
        return setCurrentSectionId(asideSections[lastIndex]);
      }

      for (let i = lastIndex; i >= 0; i--) {
        const section = asideSections[i];
        if (!section) return;

        const element = props.sectionRefs.current[section];
        if (!element) return;

        const offsetTop = getOffsetTopRelativeToContainer({
          element,
          container: scrollContainer,
        });

        if (offsetTop < threshold) {
          return setCurrentSectionId(asideSections[i]);
        }
      }

      setCurrentSectionId(undefined);
    };

    // initial set up
    scrollHandler();

    const listener = throttle(scrollHandler, 64);

    window.addEventListener("scroll", listener, { passive: true });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [asideSections, props.sectionRefs]);

  React.useEffect(() => {
    if (!currentSectionId) return setIndicatorStyle(defaultIndicatorStyle);
    const currentNavElement = navItemRefs.current[currentSectionId];
    if (!currentNavElement) return setIndicatorStyle(defaultIndicatorStyle);
    setIndicatorStyle({
      height: currentNavElement.offsetHeight,
      top: currentNavElement.offsetTop,
    });
  }, [currentSectionId]);

  React.useEffect(
    () => () => {
      if (clickedTimerId.current) clearTimeout(clickedTimerId.current);
    },
    [],
  );

  return (
    <aside className={css.aside}>
      <div className={css.stickyContainer}>
        <ButtonLink className={css.backLink} to={Routes.PublicRoutes.PROJECTS}>
          <MaskedIcon src={Icons.arrowInsert} />
          Back to Projects
        </ButtonLink>

        <ul
          className={css.nav}
          style={
            {
              "--indicator-height": `${indicatorStyle.height}px`,
              "--indicator-top": `${indicatorStyle.top}px`,
            } as React.CSSProperties
          }
        >
          {asideSections.map((section) => (
            <li key={section}>
              <Link
                ref={(el) => {
                  navItemRefs.current[section] = el;
                }}
                className={cn(
                  css.nav__item,
                  section === currentSectionId && css.nav__item_current,
                )}
                to={{
                  hash: section,
                }}
                onClick={getOnNavLinkClick(section)}
                shallow={true}
                scroll={false}
              >
                {props.sections[section].title}
              </Link>
            </li>
          ))}

          <div className={css.indicator} />
        </ul>
      </div>
    </aside>
  );
};

const getOffsetTopRelativeToContainer = (params: {
  element: Element | null;
  container: HTMLElement;
}): number => {
  if (
    !params.element ||
    !(params.element instanceof HTMLElement) ||
    params.element === params.container
  ) {
    return 0;
  }

  return (
    params.element.offsetTop +
    getOffsetTopRelativeToContainer({
      ...params,
      element: params.element.offsetParent,
    })
  );
};

const defaultIndicatorStyle = {
  height: 0,
  top: 0,
};
