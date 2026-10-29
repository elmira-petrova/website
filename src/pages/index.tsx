import React from "react";
import { PageWithLayout } from "../utils/next/next";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { Hero } from "../sections/Home/Hero/Hero";
import { SelectedWork } from "../sections/Home/SelectedWork/SelectedWork";
import { Honeycomb } from "../sections/Home/Honeycomb/Honeycomb";

const Home: PageWithLayout = () => {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Honeycomb />
    </>
  );
};

Home.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default Home;
