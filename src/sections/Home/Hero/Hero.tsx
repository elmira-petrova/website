import React from "react";
import { NoSsr } from "@mui/material";
import { cn, commonCss } from "../../../utils/styles/styles";
import { Image } from "../../../components/ui/Image/Image";
import { Images } from "../../../components/Images/Images";
import { LinkUnstyled } from "../../../components/ui/links/LinkUnstyled/LinkUnstyled";
import { Tooltip } from "../../../components/ui/Tooltip/Tooltip";
import { Routes } from "../../../features/navigation/constants";
import { Header, HeaderProps } from "./Header/Header";
import { Bee } from "./Bee/Bee";

import css from "./Hero.module.scss";

export const Hero = () => {
  const renderMyPhoto: HeaderProps["renderMyPhoto"] = (params) => (
    <Tooltip title="Hi, I’m Elmira!" {...params?.TooltipProps}>
      <LinkUnstyled to={Routes.PublicRoutes.ABOUT}>
        <Image src={Images.home.myPhoto} alt="my photo" />
      </LinkUnstyled>
    </Tooltip>
  );

  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <Header renderMyPhoto={renderMyPhoto} />

      <p className={css.description}>
        Years of making complex information clear and useful for people
        <br />
        now shape how I create thoughtful digital experiences.
      </p>

      {renderMyPhoto({
        TooltipProps: { className: css.photo, placement: "bottom" },
      })}

      <NoSsr>
        <Bee />
      </NoSsr>
    </section>
  );
};
