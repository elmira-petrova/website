import { Images } from "../../../components/Images/Images";
import { Routes } from "../../navigation/constants";
import { Project, ProjectIds } from "./types";

export const ProjectsDict = {
  [ProjectIds.CoffeeDistrict]: {
    id: ProjectIds.CoffeeDistrict,
    title: "Coffee E-commerce Platform",
    href: Routes.PublicRoutes.COFFEE_DISTRICT,
    img: Images.projects.coffeeDistrict.coffee_district_img.src,
    thumbnail: Images.projects.coffeeDistrict.coffee_district_cover_1.src,
    description: "Designing a smoother coffee shopping experience",
    type: "B2C",
  },
} as const satisfies {
  [key in ProjectIds]: Project & { id: key };
};
