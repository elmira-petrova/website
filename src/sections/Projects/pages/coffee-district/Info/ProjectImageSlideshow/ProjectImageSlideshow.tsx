import React from "react";
import { cn } from "../../../../../../utils/styles/styles";
import { Image, ImageProps } from "../../../../../../components/ui/Image/Image";

import css from "./ProjectImageSlideshow.module.scss";

type ProjectImageSlideshowProps = {
  slides: readonly string[];
  alt: string;
  className?: string;
  ImageProps?: Pick<ImageProps, "loading" | "fetchPriority">;
};

export const ProjectImageSlideshow = (props: ProjectImageSlideshowProps) => {
  return (
    <div
      className={cn(css.slideshow, props.className)}
      style={
        {
          "--slideshow-slides": props.slides.length,
        } as React.CSSProperties
      }
    >
      <div className={css.slides}>
        {props.slides.map((image, index) => (
          <div key={index} className={css.slide}>
            <Image
              className={css.img}
              src={image}
              alt={props.alt}
              {...props.ImageProps}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
