import React from "react";
import { cn, commonCss } from "../../../utils/styles/styles";
import { Routes } from "../../../features/navigation/constants";
import { useRouter } from "../../../features/navigation/hooks/useRouter/useRouter";
import { Button } from "../../../components/ui/buttons/Button/Button";
import { ButtonLink } from "../../../components/ui/links/ButtonLink/ButtonLink";

import css from "./Page500Content.module.scss";

export const Page500Content = () => {
  const router = useRouter();

  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <h1>500. Something went wrong...</h1>

      <Button onClick={router.reload}>Reload the page</Button>

      <ButtonLink to={Routes.PublicRoutes.HOME}>Home page</ButtonLink>
    </section>
  );
};
