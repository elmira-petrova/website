import React from "react";
import { UrlObject } from "url";
import { resolveHref } from "next/dist/client/resolve-href";
import { NextRouter } from "next/router";
import { cn } from "../../../../utils/styles/styles";
import { useRouter } from "../../../../features/navigation/hooks/useRouter/useRouter";
import { Link } from "../Link/Link";

import css from "./NavLink.module.scss";

const getLinkUrl = (params: {
  router: Pick<NextRouter, "asPath" | "pathname">;
  href: string | UrlObject;
  as: string | UrlObject | undefined;
}): string => {
  if (params.as)
    return resolveHref(params.router as unknown as NextRouter, params.as);

  const [resolvedHref, resolvedAs] = resolveHref(
    params.router as unknown as NextRouter,
    params.href,
    true,
  );

  return resolvedAs || resolvedHref;
};

const checkLinkIsActive = (params: {
  linkPathname: string;
  activePathname: string;
  end: boolean | undefined;
}): boolean => {
  if (params.linkPathname === params.activePathname) return true;
  if (params.end) return false;

  const endSlashPosition =
    params.linkPathname !== "/" && params.linkPathname.endsWith("/")
      ? params.linkPathname.length - 1
      : params.linkPathname.length;

  return (
    params.activePathname.startsWith(params.linkPathname) &&
    params.activePathname.charAt(endSlashPosition) === "/"
  );
};

type NavLinkProps = {
  activeClassName?: string;
  end?: boolean;
} & React.ComponentPropsWithoutRef<typeof Link>;

export const NavLink = (props: NavLinkProps) => {
  const { activeClassName, end, ...restInputProps } = props;
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!router.isReady) return;

    const linkUrlString = getLinkUrl({
      router,
      href: props.to,
      as: props.as,
    });

    const linkPathname = new URL(linkUrlString, location.href).pathname;

    const activePathname = new URL(router.asPath, location.href).pathname;

    const nextIsActive = checkLinkIsActive({
      linkPathname,
      activePathname,
      end,
    });

    setIsActive(nextIsActive);
  }, [end, props.as, props.to, router]);

  return (
    <Link
      {...restInputProps}
      className={cn(
        css.link,
        isActive && cn(css.link_active, activeClassName),
        props.className,
      )}
    />
  );
};
