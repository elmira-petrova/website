import React from "react";
import { cn } from "../../../../utils/styles/styles";
import { LinearProgress } from "../../../../components/ui/loaders/LinearProgress/LinearProgress";
import { useRouter } from "../../hooks/useRouter/useRouter";

import css from "./AppNavigationProgressIndicator.module.scss";

export const AppNavigationProgressIndicator = React.memo(() => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { events } = useRouter();

  React.useEffect(() => {
    const onStart = (_url: string, options: { shallow: boolean }) => {
      if (options.shallow) return;
      setIsLoading(true);
    };
    const onComplete = () => setIsLoading(false);

    events.on("routeChangeStart", onStart);
    events.on("routeChangeComplete", onComplete);
    events.on("routeChangeError", onComplete);

    return () => {
      events.off("routeChangeStart", onStart);
      events.off("routeChangeComplete", onComplete);
      events.off("routeChangeError", onComplete);
    };
  }, [events]);

  return (
    <LinearProgress
      variant="determinate"
      value={100}
      style={{ opacity: isLoading ? 1 : 0 }}
      classes={{
        root: cn(css.container, isLoading && css.container_loading),
        bar: cn(css.progressBar, isLoading && css.progressBar_loading),
      }}
      aria-hidden={true}
    />
  );
});
AppNavigationProgressIndicator.displayName = "AppNavigationProgressIndicator";
