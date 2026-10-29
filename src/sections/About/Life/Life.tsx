import { cn, commonCss } from "../../../utils/styles/styles";
import { Images } from "../../../components/Images/Images";
import { Image } from "../../../components/ui/Image/Image";
import {
  Autoplay,
  Swiper,
  SwiperSlide,
} from "../../../components/ui/Swiper/Swiper";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { ItemList } from "../components/ItemList/ItemList";

import css from "./Life.module.scss";

const ITEMS = ["Gym", "Cooking", "Cycling", "Languages", "Hiking", "Reading"];

const PHOTOS = [
  Images.about.img1,
  Images.about.img2,
  Images.about.img3,
  Images.about.img4,
  Images.about.img5,
  Images.about.img6,
  Images.about.img7,
  Images.about.img8,
];

export const Life = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <SectionHeader>Life outside design</SectionHeader>

      <ItemList items={ITEMS} />
      <p className={css.list__description}>Just a few things I enjoy.</p>

      <Swiper
        className={css.swiper}
        slidesPerView="auto"
        wrapperTag="ul"
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          disableOnInteraction: false,
        }}
      >
        {PHOTOS.map((photo) => (
          <SwiperSlide key={photo.src} className={css.img} tag="li">
            <Image src={photo.src} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      <p>
        One more thing we share ... This website is another thing we made
        together — I designed it, and my husband, a Software Engineer, brought
        it to life in code.
      </p>
    </section>
  );
};
