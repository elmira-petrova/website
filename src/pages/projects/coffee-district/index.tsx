import React from "react";
import { PageWithLayout } from "../../../utils/next/next";
import { PageLayout } from "../../../layouts/PageLayout/PageLayout";
import { PageHead } from "../../../features/seo/components/PageHead/PageHead";
import { ProjectsDict } from "../../../features/entities/projects/constants";
import { Header } from "../../../sections/Projects/pages/coffee-district/Header/Header";
import { Info } from "../../../sections/Projects/pages/coffee-district/Info/Info";
import { NextProject } from "../../../sections/Projects/pages/coffee-district/NextProject/NextProject";
import { ProjectIds } from "../../../features/entities/projects/types";

const Project: PageWithLayout = () => {
  const nextProject = ProjectsDict[ProjectIds.CoffeeDistrict];

  const headerText = ProjectsDict[ProjectIds.CoffeeDistrict].title;

  return (
    <>
      <PageHead title={headerText} />
      <Header headerText={headerText} />
      <Info />
      <NextProject {...nextProject} />
    </>
  );
};

Project.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default Project;
