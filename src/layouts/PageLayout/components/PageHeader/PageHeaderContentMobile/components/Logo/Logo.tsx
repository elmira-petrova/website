import { LinkUnstyled } from "../../../../../../../components/ui/links/LinkUnstyled/LinkUnstyled";
import { Routes } from "../../../../../../../features/navigation/constants";

import css from "./Logo.module.scss";

type LogoProps = {
  onClick?: () => void;
};

export const Logo = (props: LogoProps) => {
  return (
    <LinkUnstyled className={css.link} to={Routes.PublicRoutes.HOME} {...props}>
      {"ELMIRA PETROVA".split("").map((char, index) => (
        <span key={index} className={css.char}>
          {char}
        </span>
      ))}
    </LinkUnstyled>
  );
};
