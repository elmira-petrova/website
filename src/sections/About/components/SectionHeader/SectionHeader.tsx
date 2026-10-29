import React from "react";
import { cn } from "../../../../utils/styles/styles";

import css from "./SectionHeader.module.scss";

type SectionHeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const SectionHeader = (props: SectionHeaderProps) => {
  return <h2 {...props} className={cn(css.header, props.className)} />;
};
