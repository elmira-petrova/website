import React from "react";
import { StaticImageData } from "next/image";
import { cn } from "../../../utils/styles/styles";

import css from "./MaskedIcon.module.scss";

type MaskedIconProps = {
  src: string | StaticImageData;
} & Omit<React.ComponentPropsWithoutRef<"span">, "children">;

export const MaskedIcon = (props: MaskedIconProps) => {
  const { src, ...restProps } = props;

  const style = {
    ...props.style,
    maskImage: `url("${typeof src === "string" ? src : src.src}")`,
  };

  return (
    <span
      aria-hidden={true}
      {...restProps}
      className={cn(css.icon, props.className)}
      style={style}
    />
  );
};
