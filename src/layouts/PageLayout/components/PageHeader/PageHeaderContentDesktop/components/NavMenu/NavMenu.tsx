import React from "react";
import { NavLink } from "../../../../../../../components/ui/links/NavLink/NavLink";
import { Routes } from "../../../../../../../features/navigation/constants";
import { CopyEmail } from "./CopyEmail/CopyEmail";

import css from "./NavMenu.module.scss";

export const NavMenu = () => {
  return (
    <nav className={css.nav}>
      <NavLink to={Routes.PublicRoutes.HOME}>Home</NavLink>
      <NavLink to={Routes.PublicRoutes.PROJECTS}>Projects</NavLink>
      <NavLink to={Routes.PublicRoutes.ABOUT}>About</NavLink>
      <CopyEmail />
    </nav>
  );
};
