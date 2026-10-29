import { RoutesType } from "../../navigation/constants";

export enum ProjectIds {
  CoffeeDistrict = "coffee-district",
}

export type Project = {
  id: ProjectIds;
  title: string;
  href: RoutesType;
  img: string;
  thumbnail: string;
  description: string;
  type: string;
};
