import { cn, commonCss } from "../../../../../utils/styles/styles";
import { LinkUnstyled } from "../../../../../components/ui/links/LinkUnstyled/LinkUnstyled";
import { Image } from "../../../../../components/ui/Image/Image";
import { RoutesType } from "../../../../../features/navigation/constants";

import css from "./NextProject.module.scss";

type NextProjectProps = {
  href: RoutesType;
  title: string;
  thumbnail: string;
};

export const NextProject = (props: NextProjectProps) => {
  return null;
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <LinkUnstyled className={css.link} to={props.href}>
        <div className={css.img}>
          <Image src={props.thumbnail} alt={props.title} />
        </div>

        <p className={css.text}>
          Next project
          <span className={css.name}>{props.title}</span>
        </p>
      </LinkUnstyled>
    </section>
  );
};
