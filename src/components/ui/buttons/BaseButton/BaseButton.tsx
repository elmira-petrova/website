import React from "react";
import {
  Button as ButtonMUI,
  ButtonProps as ButtonPropsMUI,
  ButtonTypeMap,
} from "@mui/material";
import { cn } from "../../../../utils/styles/styles";

import css from "./BaseButton.module.scss";

export type BaseButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<
  ButtonPropsMUI<RootComponent, AdditionalProps>,
  "color" | "variant" | "size"
> & {
  component?: RootComponent;
};

export const BaseButton = <
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: BaseButtonProps<RootComponent, AdditionalProps>,
) => {
  return (
    <ButtonMUI
      variant="text"
      disableRipple={true}
      type="button"
      {...props}
      className={cn(css.button, props.className)}
    />
  );
};
