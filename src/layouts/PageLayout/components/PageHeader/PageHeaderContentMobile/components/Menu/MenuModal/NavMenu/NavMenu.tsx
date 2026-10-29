import React from "react";
import { NavLink } from "../../../../../../../../../components/ui/links/NavLink/NavLink";
import { Routes } from "../../../../../../../../../features/navigation/constants";
import { CopyEmail } from "../../../../../PageHeaderContentDesktop/components/NavMenu/CopyEmail/CopyEmail";

import css from "./NavMenu.module.scss";

type NavMenuProps = {
  onItemClick: () => void;
};

export const NavMenu = (props: NavMenuProps) => {
  return (
    <nav className={css.nav}>
      <NavLink to={Routes.PublicRoutes.HOME} onClick={props.onItemClick}>
        Home
      </NavLink>
      <NavLink to={Routes.PublicRoutes.PROJECTS} onClick={props.onItemClick}>
        Projects
      </NavLink>
      <NavLink to={Routes.PublicRoutes.ABOUT} onClick={props.onItemClick}>
        About
      </NavLink>

      <CopyEmail
        textSuccessProps={{ className: css.copyEmail__text_success }}
      />
    </nav>
  );
};
