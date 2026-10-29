import { cn, commonCss } from "../../../../../utils/styles/styles";

import css from "./Header.module.scss";

type HeaderProps = {
  headerText: string;
};

export const Header = (props: HeaderProps) => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <h1 className={css.header}>{props.headerText}</h1>
    </section>
  );
};
