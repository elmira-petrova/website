import React from "react";
import Drawer from "@mui/material/Drawer";
import { cn, commonCss } from "../../../../../../../../utils/styles/styles";
import { Time } from "../../../../PageHeaderContentDesktop/components/Time/Time";
import { OpenToWork } from "../../../../PageHeaderContentDesktop/components/OpenToWork/OpenToWork";
import { NavMenu } from "./NavMenu/NavMenu";

import css from "./MenuModal.module.scss";

type MenuModalProps = {
  open: boolean;
  onClose: () => void;
};

export const MenuModal = (props: MenuModalProps) => {
  // close modal on unmount
  React.useEffect(() => props.onClose, [props.onClose]);

  return (
    <>
      <Drawer
        {...props}
        hideBackdrop={true}
        classes={{
          root: css.root,
          paper: cn(commonCss.contentContainer, css.paper),
        }}
      >
        <NavMenu onItemClick={props.onClose} />

        <div className={css.divider} />

        <div>
          <Time />
          <OpenToWork />
        </div>
      </Drawer>
    </>
  );
};
