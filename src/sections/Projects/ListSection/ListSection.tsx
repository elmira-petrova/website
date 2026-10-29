import { cn, commonCss } from "../../../utils/styles/styles";
import { ProjectsDict } from "../../../features/entities/projects/constants";
import { Project } from "../../Home/SelectedWork/Project/Project";

import css from "./ListSection.module.scss";

const PROJECTS = Object.values(ProjectsDict);

export const ListSection = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <div className={css.projects}>
        {PROJECTS.map((project, index) => (
          <Project
            key={index}
            {...project}
            ProjectImageScrollingProps={
              index === 0
                ? { ImageProps: { loading: "eager", fetchPriority: "high" } }
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
};
