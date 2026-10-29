import { cn, commonCss } from "../../../utils/styles/styles";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { ItemList } from "../components/ItemList/ItemList";

import css from "./Languages.module.scss";

const ITEMS = ["English", "Bulgarian", "Tatar", "Russian", "Spanish", "German"];

export const Languages = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <SectionHeader>Languages</SectionHeader>

      <ItemList items={ITEMS} />
    </section>
  );
};
