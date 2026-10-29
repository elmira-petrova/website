import React from "react";
import TooltipMUI, {
  type TooltipProps as TooltipPropsMUI,
} from "@mui/material/Tooltip";
import { PopperProps } from "@mui/material/Popper";
import { mergePropClasses } from "../../../utils/styles/styles";

import css from "./Tooltip.module.scss";

export type TooltipProps = {} & TooltipPropsMUI;

export const Tooltip = (props: TooltipProps) => {
  const classes = mergePropClasses(props, {
    tooltip: css.tooltip,
    arrow: css.arrow,
  });

  return (
    <TooltipMUI
      placement="top"
      arrow
      {...props}
      classes={classes}
      slotProps={{
        ...props.slotProps,
        popper: {
          ...props.slotProps?.popper,
          modifiers: mergePopperModifiers({
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -2],
                },
              },
            ],
            props,
          }),
        },
      }}
    >
      <span>{props.children}</span>
    </TooltipMUI>
  );
};

const mergePopperModifiers = (params: {
  modifiers: NonNullable<PopperProps["modifiers"]>;
  props: TooltipProps;
}) => {
  if (
    params.props.slotProps?.popper &&
    "modifiers" in params.props.slotProps.popper &&
    params.props.slotProps.popper.modifiers?.length
  )
    return [...params.modifiers, ...params.props.slotProps?.popper.modifiers];

  return params.modifiers;
};
