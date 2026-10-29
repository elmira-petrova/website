import { ProjectsDict } from "../../../../../features/entities/projects/constants";
import { ProjectIds } from "../../../../../features/entities/projects/types";

export const project = ProjectsDict[ProjectIds.CoffeeDistrict];

export const Sections = {
  overview: {
    id: "overview",
    title: "Project overview",
  },
  challenge: {
    id: "challenge",
    title: "The challenge",
  },
  finalUI: {
    id: "finalUI",
    title: "Final UI",
  },
} as const;

Sections satisfies {
  [K in keyof typeof Sections]: { id: K };
};
