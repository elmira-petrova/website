import React from "react";
import { Config } from "../../../../../../../../constants/config";
import { cn } from "../../../../../../../../utils/styles/styles";
import { Link } from "../../../../../../../../components/ui/links/Link/Link";
import { copyTextToClipboard } from "../../../../../../../../utils/clipboard/clipboard";

import css from "./CopyEmail.module.scss";

const SUCCESS_DELAY = 1000;

type CopyEmailProps = {
  textSuccessProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;
};

export const CopyEmail = (props: CopyEmailProps) => {
  const { textSuccessProps } = props;

  const [timerId, setTimerId] = React.useState<ReturnType<typeof setTimeout>>();

  const email = Config.contacts.email;

  const onCopyEmailClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    event.preventDefault();

    clearTimeout(timerId);
    setTimerId(
      setTimeout(() => {
        setTimerId(undefined);
      }, SUCCESS_DELAY),
    );
    return copyTextToClipboard(email);
  };

  React.useEffect(() => () => clearTimeout(timerId), [timerId]);

  return (
    <Link
      className={cn(css.link, timerId && css.link_success)}
      to={`mailto:${email}`}
      onClick={onCopyEmailClick}
    >
      <span className={css.text}>Copy email</span>
      <span
        {...textSuccessProps}
        className={cn(css.text, css.text_success, textSuccessProps?.className)}
      >
        Copied
      </span>
    </Link>
  );
};
