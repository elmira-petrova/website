import React from "react";
import {
  useRouter,
  UseRouterReturnType,
} from "../../hooks/useRouter/useRouter";

type RedirectProps = {
  url: Parameters<UseRouterReturnType["replace"]>[0];
  as?: Parameters<UseRouterReturnType["replace"]>[1];
  options?: Parameters<UseRouterReturnType["replace"]>[2];
};

export const Redirect = React.memo((props: RedirectProps) => {
  const { replace } = useRouter();

  React.useEffect(() => {
    replace(props.url, props.as, props.options).catch(console.error);
  }, [props.as, props.options, props.url, replace]);

  return null;
});
Redirect.displayName = "Redirect";
