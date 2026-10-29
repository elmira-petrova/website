import React from "react";
import { cn, commonCss } from "../../../../utils/styles/styles";
import { LinkUnstyled, LinkUnstyledProps } from "../LinkUnstyled/LinkUnstyled";

import css from "./Link.module.scss";

type LinkProps<T extends string = string> = {} & LinkUnstyledProps<T>;

const LinkComponent = <T extends string = string>(
  props: LinkProps<T>,
  ref: React.Ref<HTMLAnchorElement>,
) => {
  return (
    <LinkUnstyled<T>
      ref={ref}
      {...props}
      className={cn(commonCss.interactive, css.link, props.className)}
    />
  );
};

export const Link = React.forwardRef(LinkComponent) as <
  T extends string = string,
>(
  props: LinkProps<T>,
) => ReturnType<typeof LinkComponent<T>>;
