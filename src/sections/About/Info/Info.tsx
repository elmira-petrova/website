import { cn, commonCss } from "../../../utils/styles/styles";
import { Image } from "../../../components/ui/Image/Image";
import { Images } from "../../../components/Images/Images";

import css from "./Info.module.scss";

export const Info = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <div className={css.photo}>
        <Image
          className={css.photo__img}
          src={Images.about.about}
          alt="Elmira Petrova"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div>
        <h2 className={css.header}>Hi, I’m Elmira.</h2>
        <p className={css.description}>
          I’m a Product Designer. Before moving into design, I spent several
          years working in a corporate environment, coordinating projects,
          collaborating across teams, and working with large amounts of
          information.
        </p>
        <h2 className={cn(css.header, css.header_last)}>
          From information to interfaces
        </h2>
        <p className={css.description}>
          My previous work often involved bringing together different
          perspectives and competing priorities, while turning complex
          information that was difficult to analyze and understand into
          something clearer and more useful for people.
        </p>
        <p className={css.description}>
          Today, I bring the same way of thinking into design - looking for what
          matters, creating structure, and paying attention to how people
          interact with digital products.
        </p>
      </div>
    </section>
  );
};
