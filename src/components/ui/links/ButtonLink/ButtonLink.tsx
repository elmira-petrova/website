import React from "react";
import { LinkUnstyled } from "../LinkUnstyled/LinkUnstyled";
import { Button, ButtonProps } from "../../buttons/Button/Button";

export type ButtonLinkProps<T extends string = string> = Omit<
  ButtonProps<typeof LinkUnstyled<T>>,
  "component"
>;

export const ButtonLink = <T extends string = string>(
  props: ButtonLinkProps<T>,
) => {
  return (
    <Button {...props} component={LinkUnstyled<T>}>
      {props.children}
    </Button>
  );
};
