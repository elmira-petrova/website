import React from "react";
import { cn } from "../../../../../../utils/styles/styles";

import css from "./ProjectVideo.module.scss";

type ProjectVideoProps = {
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
} & React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

export const ProjectVideo = (props: ProjectVideoProps) => {
  const { containerProps, ...restProps } = props;

  return (
    <div
      {...containerProps}
      className={cn(css.video, props.containerProps?.className)}
    >
      <video
        className={cn(css.video__video, props.className)}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        {...restProps}
      />
    </div>
  );
};
