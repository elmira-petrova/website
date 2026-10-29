import React from "react";
// eslint-disable-next-line no-restricted-imports
import { default as NextImage, ImageProps as NextImageProps } from "next/image";

export type ImageProps = {} & NextImageProps;

export const Image = (props: ImageProps) => {
  return <NextImage fill={true} crossOrigin="anonymous" {...props} />;
};
