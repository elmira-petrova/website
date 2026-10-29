import React from "react";
import { cn } from "../../../../../utils/styles/styles";
import { throttle } from "../../../../../utils/functions/functions";
import { useToggle } from "../../../../../utils/hooks/useToggle/useToggle";
import { Tooltip } from "../../../../../components/ui/Tooltip/Tooltip";
import { ReactComponent as BeeImage } from "../../../../../assets/images/bee_up.svg?react";
import { useRouter } from "../../../../../features/navigation/hooks/useRouter/useRouter";

import css from "./ToTopButton.module.scss";

enum States {
  hidden = "hidden",
  slideIn = "slideIn",
  slideOut = "slideOut",
  up = "up",
}

export const ToTopButton = () => {
  const router = useRouter();
  const tooltip = useToggle();

  const [state, setState] = React.useState<States>(States.hidden);

  React.useEffect(() => {
    const scrollHandler = () => {
      if (state === States.up) return;

      const scrollContainer = document.documentElement;

      const availableScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;

      const THRESHOLD = 200;

      if (availableScroll <= THRESHOLD) return;

      const distanceToBottom = availableScroll - scrollContainer.scrollTop;

      const shouldBeVisible = distanceToBottom < THRESHOLD;

      if (!shouldBeVisible && state === States.hidden) return;

      const nextState = shouldBeVisible ? States.slideIn : States.slideOut;

      if (nextState !== state) return setState(nextState);
    };

    // initial set up
    scrollHandler();

    const listener = throttle(scrollHandler, 64);

    window.addEventListener("scroll", listener, { passive: true });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [state]);

  // hide button on navigation
  React.useEffect(() => () => setState(States.hidden), [router.pathname]);

  return (
    <button
      className={cn(css.button, css[`button_${state}`])}
      onClick={() => {
        tooltip.turnOff();
        setState(States.up);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onTransitionEnd={(event) => {
        // ignore children transitions
        if (event.target !== event.currentTarget) return;
        if (state !== States.slideOut && state !== States.up) return;
        return setState(States.hidden);
      }}
    >
      <Tooltip
        title="Take me to the top"
        open={tooltip.isOn}
        onClose={tooltip.turnOff}
        onOpen={() => {
          if (state !== States.slideIn) return;
          tooltip.turnOn();
        }}
        enterNextDelay={100}
      >
        <BeeImage className={css.bee} />
      </Tooltip>
    </button>
  );
};
