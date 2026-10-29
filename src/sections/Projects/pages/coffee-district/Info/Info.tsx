import React from "react";
import { cn, commonCss } from "../../../../../utils/styles/styles";
import { Images } from "../../../../../components/Images/Images";
import { Videos } from "../../../../../components/Videos/Videos";
import { Sections } from "./constants";
import { Aside, AsideProps } from "./Aside/Aside";
import { ProjectImageSlideshow } from "./ProjectImageSlideshow/ProjectImageSlideshow";
import { ProjectImageScrolling } from "./ProjectImageScrolling/ProjectImageScrolling";
import { ProjectVideo } from "./ProjectVideo/ProjectVideo";
import { ProjectImage } from "./ProjectImage/ProjectImage";

import css from "./Info.module.scss";

export const Info = () => {
  const sectionRefs = React.useRef(defaultSectionRefs);

  const setSectionRef =
    (id: keyof typeof Sections) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    };

  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <Aside sections={Sections} sectionRefs={sectionRefs} />

      <ProjectImageSlideshow
        className={css.cover}
        slides={[
          Images.projects.coffeeDistrict.coffee_district_cover_1.src,
          Images.projects.coffeeDistrict.coffee_district_cover_2.src,
          Images.projects.coffeeDistrict.coffee_district_cover_3.src,
          Images.projects.coffeeDistrict.coffee_district_cover_4.src,
          Images.projects.coffeeDistrict.coffee_district_cover_5.src,
        ]}
        alt={Sections.overview.title}
        ImageProps={{ loading: "eager", fetchPriority: "high" }}
      />

      <section
        ref={setSectionRef(Sections.overview.id)}
        id={Sections.overview.id}
        className={css.section}
      >
        <ProjectImage
          className={css.media}
          src={Images.projects.coffeeDistrict.coffee_district_section1.src}
          alt={Sections.overview.title}
        />
        <h2 className={css.header}>{Sections.overview.title}</h2>
        <p className={css.description}>
          Coffee District is a conceptual UX/UI case study for a multi-brand
          online store offering coffee, brewing equipment, accessories and
          syrups from well-known brands. The project focuses on creating a
          seamless shopping experience across desktop, tablet and mobile
          devices.
        </p>
      </section>

      <section
        ref={setSectionRef(Sections.challenge.id)}
        id={Sections.challenge.id}
        className={cn(css.section, css.blockContainer)}
      >
        <div>
          <ProjectVideo
            src={Videos.projects.coffeeDistrict.IA_Exploration}
            containerProps={{ className: css.media }}
          />

          <h2 className={css.header}>{Sections.challenge.title}</h2>
          <p className={css.description}>
            Design an intuitive e-commerce experience for a diverse product
            catalog while keeping navigation, product discovery and the checkout
            process simple and efficient. The challenge was to organize multiple
            product categories without overwhelming users.
          </p>
        </div>
        <div>
          <ProjectVideo
            src={Videos.projects.coffeeDistrict.Product_card}
            containerProps={{ className: css.media }}
          />
          <p className={css.description}>
            Everything you need to make the choice.
          </p>
        </div>

        <div>
          <ProjectImage
            className={css.media}
            src={Images.projects.coffeeDistrict.coffee_district_section2.src}
            alt=""
          />
          <p className={css.description}>
            Keep the decision simple. Free shipping threshold notification.
          </p>
        </div>

        <div>
          <ProjectVideo
            src={Videos.projects.coffeeDistrict.Final}
            containerProps={{ className: css.media }}
          />
          <p className={css.description}>
            A coffee store shouldn&#39;t make choosing coffee feel complicated.
            The goal was to make every step — from discovery to checkout — feel
            natural, clear and effortless.
          </p>
        </div>
      </section>

      <section
        ref={setSectionRef(Sections.finalUI.id)}
        id={Sections.finalUI.id}
        className={css.section}
      >
        <ProjectImageScrolling
          className={css.media}
          src={Images.projects.coffeeDistrict.coffee_district_section3.src}
          alt={Sections.finalUI.title}
        />
        <h2 className={css.header}>{Sections.finalUI.title}</h2>
        <p className={css.description}>
          Designed responsive interfaces for desktop, tablet and mobile,
          ensuring a consistent experience across different screen sizes while
          maintaining usability and visual clarity.
        </p>
      </section>
    </section>
  );
};

const defaultSectionRefs = Object.fromEntries(
  Object.keys(Sections).map((key) => [key, null]),
) as AsideProps<keyof typeof Sections>["sectionRefs"]["current"];
