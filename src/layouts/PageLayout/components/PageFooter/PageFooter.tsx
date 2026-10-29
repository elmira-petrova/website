import React from "react";
import { Route } from "next";
import { NoSsr } from "@mui/material";
import { Config } from "../../../../constants/config";
import { cn, commonCss } from "../../../../utils/styles/styles";
import { Link } from "../../../../components/ui/links/Link/Link";
import { ToTopButton } from "./ToTopButton/ToTopButton";

import css from "./PageFooter.module.scss";

export const PageFooter = React.memo(() => {
  return (
    <footer className={cn(commonCss.contentContainer, css.container)}>
      <h3 className={css.header}>Let&#39;s connect</h3>
      <p className={css.text}>
        Open to design opportunities, collaborations, and&nbsp;conversations.
      </p>
      <div className={css.links}>
        <Link to={`mailto:${Config.contacts.email}`}>Email</Link>
        <Link to={Config.contacts.linkedin as Route} target="_blank">
          LinkedIn
        </Link>
      </div>

      <p className={css.copyright}>
        © 2026 Elmira Petrova +{" "}
        <Link
          className={css.miroslav}
          to={"https://github.com/petrovmiroslav" as Route}
          target="_blank"
        >
          Miroslav Petrov
        </Link>
      </p>

      <NoSsr>
        <ToTopButton />
      </NoSsr>
    </footer>
  );
});
PageFooter.displayName = "PageFooter";
