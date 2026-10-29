import React from "react";
import { PageWithLayout } from "../../utils/next/next";
import { PageLayout } from "../../layouts/PageLayout/PageLayout";
import { PageHead } from "../../features/seo/components/PageHead/PageHead";
import { Header } from "../../sections/About/Header/Header";
import { Info } from "../../sections/About/Info/Info";
import { Skills } from "../../sections/About/Skills/Skills";
import { Tools } from "../../sections/About/Tools/Tools";
import { Languages } from "../../sections/About/Languages/Languages";
import { Life } from "../../sections/About/Life/Life";

const About: PageWithLayout = () => {
  const headerText = "About me";

  return (
    <>
      <PageHead title={headerText} />
      <Header headerText={headerText} />
      <Info />
      <Skills />
      <Tools />
      <Languages />
      <Life />
    </>
  );
};

About.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default About;
