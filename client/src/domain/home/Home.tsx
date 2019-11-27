import React from "react";
import { useTranslation } from "react-i18next";

import Hero from "../../common/components/hero/Hero";
import Container from "../app/layout/Container";
import Layout from "../app/layout/Layout";
import Search from "./Search";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Hero
        buttonText={t("home.hero.buttonText")}
        subTitle={t("home.hero.subTitle")}
        title={t("home.hero.title")}
      />
      <Container>
        <Search />
      </Container>
    </Layout>
  );
};

export default Home;
