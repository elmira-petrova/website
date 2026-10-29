import { cn, commonCss } from "../../../utils/styles/styles";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { ItemList } from "../components/ItemList/ItemList";

import css from "./Tools.module.scss";

const ITEMS = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe Firefly",
  "Webflow",
  "ChatGPT",
  "Claude",
  "Gemini",
];

export const Tools = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <SectionHeader>Software & Tools</SectionHeader>

      <ItemList items={ITEMS} />
    </section>
  );
};
