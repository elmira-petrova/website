import React from "react";
import { cn, commonCss } from "../../../../../utils/styles/styles";

import css from "./Item.module.scss";

type ItemProps = {
  name: string;
};

export const Item = React.memo<ItemProps>((props) => {
  return (
    <li className={cn(commonCss.breakLongWord, css.item)}>{props.name}</li>
  );
});
Item.displayName = "Item";
