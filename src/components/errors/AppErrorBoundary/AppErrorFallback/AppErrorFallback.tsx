import React from "react";
import { Routes } from "../../../../features/navigation/constants";
import { useRouter } from "../../../../features/navigation/hooks/useRouter/useRouter";
import { cn, commonCss } from "../../../../utils/styles/styles";
import { Button } from "../../../ui/buttons/Button/Button";
import { ButtonLink } from "../../../ui/links/ButtonLink/ButtonLink";

import css from "./AppErrorFallback.module.scss";

type AppErrorFallbackProps = {
  error: unknown;
  resetErrorBoundary: () => void;
};

export const AppErrorFallback = (props: AppErrorFallbackProps) => {
  const router = useRouter();

  const resetErrorOnNavigationComplete = () => {
    const eventName = "routeChangeComplete";
    const listener = () => {
      props.resetErrorBoundary();
      router.events.off(eventName, listener);
    };

    router.events.on(eventName, listener);
  };

  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <h1>Oops, something went wrong...</h1>

      <Button onClick={router.reload}>Reload the page</Button>

      <ButtonLink
        to={Routes.PublicRoutes.HOME}
        onNavigate={resetErrorOnNavigationComplete}
      >
        Home page
      </ButtonLink>
    </section>
  );
};
