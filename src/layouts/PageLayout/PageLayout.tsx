import React from "react";
import { cn } from "../../utils/styles/styles";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { PageFooter } from "./components/PageFooter/PageFooter";

import css from "./PageLayout.module.scss";

export type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  return (
    <div className={css.container}>
      <PageHeader />

      <main className={cn(css.main)}>{children}</main>

      <PageFooter />
    </div>
  );
};
