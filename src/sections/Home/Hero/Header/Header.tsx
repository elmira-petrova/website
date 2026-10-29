import React from "react";
import { TooltipProps } from "../../../../components/ui/Tooltip/Tooltip";
import { HEADER_CHAR_HOVER_COLORS } from "./constants";

import css from "./Header.module.scss";

export type HeaderProps = {
  renderMyPhoto: (params?: {
    TooltipProps: Pick<TooltipProps, "className" | "placement" | "slotProps">;
  }) => React.ReactElement;
};

export const Header = (props: HeaderProps) => {
  const headerChars = React.useMemo(() => {
    let currIndex = -1;
    return "Product Designer".split("").map((char) => {
      if (!/\s/.test(char)) {
        currIndex++;
      }
      return {
        char,
        style: {
          "--char-hover-color":
            HEADER_CHAR_HOVER_COLORS[
              currIndex % HEADER_CHAR_HOVER_COLORS.length
            ],
        } as React.CSSProperties,
      };
    });
  }, []);

  const myPhoto = props.renderMyPhoto({
    TooltipProps: {
      className: css.photo,
      slotProps: {
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: (params: {
                  placement: string;
                  reference: { width: number };
                }) => [
                  params.placement === "top" ? params.reference.width : 0,
                  -2,
                ],
              },
            },
          ],
        },
      },
    },
  });

  return (
    <h1 className={css.header}>
      {headerChars.map((char, index) => (
        <span key={index} className={css.char} style={char.style}>
          {char.char}
        </span>
      ))}

      {myPhoto}
    </h1>
  );
};
