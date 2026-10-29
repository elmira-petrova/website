import { NoSsr } from "@mui/material";
import { cn } from "../../../../../../../utils/styles/styles";
import { BaseButton } from "../../../../../../../components/ui/buttons/BaseButton/BaseButton";
import { MediaBreakpointUp } from "../../../../../../../utils/hooks/useMediaBreakpointUp/MediaBreakpointUp";
import { MenuModal } from "./MenuModal/MenuModal";

import css from "./Menu.module.scss";

type MenuProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const Menu = (props: MenuProps) => {
  return (
    <>
      <BaseButton
        className={css.button}
        onClick={props.isOpen ? props.onClose : props.onOpen}
        aria-label={props.isOpen ? "Close menu" : "Open menu"}
      >
        <span className={css.button__contentContainer}>
          <span
            className={cn(
              css.button__content,
              props.isOpen && css.button__content_open,
            )}
          />
        </span>
      </BaseButton>

      <NoSsr>
        <MediaBreakpointUp
          default={<MenuModal open={props.isOpen} onClose={props.onClose} />}
          widthUpLG={null}
        />
      </NoSsr>
    </>
  );
};
