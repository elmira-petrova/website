import React from "react";
import { cn } from "../../../../../../utils/styles/styles";
import { Image } from "../../../../../../components/ui/Image/Image";

import css from "./ProjectImage.module.scss";

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export const ProjectImage = (props: ProjectImageProps) => {
  return (
    <div className={cn(css.img, props.className)}>
      <Image className={css.img__img} src={props.src} alt={props.alt} />
    </div>
  );
};
