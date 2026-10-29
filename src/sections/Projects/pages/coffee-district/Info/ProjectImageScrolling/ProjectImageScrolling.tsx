import React from "react";
import { cn } from "../../../../../../utils/styles/styles";
import { Image, ImageProps } from "../../../../../../components/ui/Image/Image";

import css from "./ProjectImageScrolling.module.scss";

export type ProjectImageScrollingProps = {
  src: string;
  alt: string;
  className?: string;
  ImageProps?: Pick<ImageProps, "loading" | "fetchPriority">;
};

export const ProjectImageScrolling = (props: ProjectImageScrollingProps) => {
  return (
    <div className={cn(css.img, props.className)}>
      <Image
        className={css.img__img}
        src={props.src}
        alt={props.alt}
        fill={false}
        width={1}
        height={1}
        {...props.ImageProps}
      />
    </div>
  );
};
