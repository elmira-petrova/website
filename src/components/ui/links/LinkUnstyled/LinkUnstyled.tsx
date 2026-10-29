import React from "react";
// eslint-disable-next-line no-restricted-imports
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import type { Route } from "next";
import { UrlObject } from "url";
import { ValidSearchParams } from "../../../../features/navigation/hooks/useSearchParams/useSearchParams";

/** IF THERE IS AN ERROR - RUN "typegen" FIRST */

type TypedStringPath<T extends string> = Exclude<
  NextLinkProps<Route<T>>["href"],
  UrlObject
>;

type TypedUrlObject<T extends string> = Omit<
  UrlObject,
  "pathname" | "query"
> & {
  pathname?: TypedStringPath<T> | null | undefined;
  query?: ValidSearchParams | null | undefined;
};

export type LinkUnstyledProps<T extends string = string> = {
  to: TypedStringPath<T> | TypedUrlObject<T>;
} & Omit<NextLinkProps<Route<T>>, "href">;

const LinkUnstyledComponent = <T extends string = string>(
  props: LinkUnstyledProps<T>,
  ref: React.Ref<HTMLAnchorElement>,
) => {
  const { to, ...restProps } = props;

  const rel = props.target === "_blank" ? "noreferrer" : props.rel;

  return (
    <NextLink<T>
      ref={ref}
      href={to}
      rel={rel}
      prefetch={false}
      {...restProps}
    />
  );
};

export const LinkUnstyled = React.forwardRef(LinkUnstyledComponent) as <
  T extends string = string,
>(
  props: LinkUnstyledProps<T>,
) => ReturnType<typeof LinkUnstyledComponent<T>>;
