declare module "*.svg?react" {
  import React from "react";
  export const ReactComponent: (
    props: React.SVGProps<SVGSVGElement>,
  ) => React.ReactElement;
}

declare module "*.svg" {
  const content: import("next/image").StaticImageData;
  // @ts-expect-error content
  export default content;
}
