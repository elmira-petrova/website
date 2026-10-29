import React from "react";
import { PageWithLayout } from "../../utils/next/next";
import { PageLayout } from "../../layouts/PageLayout/PageLayout";
import { PageHead } from "../../features/seo/components/PageHead/PageHead";
import { Header } from "../../sections/Projects/Header/Header";
import { ListSection } from "../../sections/Projects/ListSection/ListSection";

const Projects: PageWithLayout = () => {
  const headerText = "My projects";

  return (
    <>
      <PageHead title={headerText} />
      <Header headerText={headerText} />
      <ListSection />
    </>
  );
};

Projects.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default Projects;
