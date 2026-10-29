import React from "react";
import { LinkUnstyled } from "../../../../components/ui/links/LinkUnstyled/LinkUnstyled";
import { RoutesType } from "../../../../features/navigation/constants";
import {
  ProjectImageScrolling,
  ProjectImageScrollingProps,
} from "../../../Projects/pages/coffee-district/Info/ProjectImageScrolling/ProjectImageScrolling";

import css from "./Project.module.scss";

type ProjectProps = {
  href: RoutesType;
  img: string;
  title: string;
  type: string;
  description: string;
  ProjectImageScrollingProps?: Pick<ProjectImageScrollingProps, "ImageProps">;
};

export const Project = React.memo<ProjectProps>((props) => {
  return (
    <LinkUnstyled to={props.href}>
      <ProjectImageScrolling
        className={css.img}
        src={props.img}
        alt={props.title}
        {...props.ProjectImageScrollingProps}
      />
      <h2 className={css.header}>
        {props.title}, <span className={css.header__type}>{props.type}</span>
      </h2>
      <p className={css.description}>{props.description}</p>
    </LinkUnstyled>
  );
});
Project.displayName = "Project";
