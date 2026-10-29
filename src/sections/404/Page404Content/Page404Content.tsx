import React from "react";
import { cn, commonCss } from "../../../utils/styles/styles";
import { Routes } from "../../../features/navigation/constants";
import { ButtonLink } from "../../../components/ui/links/ButtonLink/ButtonLink";

import css from "./Page404Content.module.scss";

export const Page404Content = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <h1>404. Page not found</h1>

      <ButtonLink to={Routes.PublicRoutes.HOME}>Home page</ButtonLink>
    </section>
  );
};
