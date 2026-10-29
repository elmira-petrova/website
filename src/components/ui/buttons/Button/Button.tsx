import React from "react";
import { ButtonTypeMap } from "@mui/material";
import { cn } from "../../../../utils/styles/styles";
import { BaseButton, BaseButtonProps } from "../BaseButton/BaseButton";
import { ButtonVariants } from "./types";

import css from "./Button.module.scss";

export type ButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
> = {
  variant?: ButtonVariants;
} & BaseButtonProps<RootComponent, AdditionalProps>;

export const Button = <
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: ButtonProps<RootComponent, AdditionalProps>,
) => {
  const { variant = ButtonVariants.PRIMARY, ...restProps } = props;

  const className = cn(
    css.button,
    css[`button_variant_${variant}`],
    props.className,
  );

  return (
    <BaseButton<RootComponent, AdditionalProps>
      {...(restProps as BaseButtonProps<RootComponent, AdditionalProps>)}
      className={className}
    />
  );
};
