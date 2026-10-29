import { cn, commonCss } from "../../../utils/styles/styles";
import { ProjectIds } from "../../../features/entities/projects/types";
import { ProjectsDict } from "../../../features/entities/projects/constants";
import { Project } from "./Project/Project";

import css from "./SelectedWork.module.scss";

const PROJECTS = [ProjectsDict[ProjectIds.CoffeeDistrict]];

export const SelectedWork = () => {
  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <h2 className={css.header}>Selected work</h2>

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
