import { cn, commonCss } from "../../../utils/styles/styles";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { ItemList } from "../components/ItemList/ItemList";

import css from "./Skills.module.scss";

const SKILLS = [
  "User Flows",
  "Information Architecture",
  "Wireframing",
  "Prototyping",
  "Responsive Design",
  "Visual Design",
  "Design Systems",
  "Competitor Analysis",
  "User Research",
  "Design Thinking",
];

export const Skills = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <SectionHeader>UX & UI Design</SectionHeader>

      <ItemList items={SKILLS} />
    </section>
  );
};
