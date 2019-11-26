import React from "react";
import { useTranslation } from "react-i18next";

import CollectionCardContainer from "../../common/components/collectionCard/CollectionCardContainer";
import Hero from "../../common/components/hero/Hero";
import Container from "../app/layout/Container";
import Layout from "../app/layout/Layout";
import styles from "./home.module.scss";
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
      <div className={styles.collectionCardContainer}>
        <Container>
          <h2>{t("home.collections.title")}</h2>
          <CollectionCardContainer
            cards={[
              {
                count: 140,
                description: "Kokosimme parhaat tärpit kesälle 2019",
                id: "1",
                title: "Paras kesä ikinä"
              }
            ]}
            size="lg"
          />

          <CollectionCardContainer
            cards={[
              {
                count: 140,
                description: "",
                id: "2",
                title: "Olipa kerra ihana kesä ja tuleva syksy."
              },
              {
                count: 140,
                description: "",
                id: "3",
                title: "Olipa kerra ihana kesä ja tuleva syksy."
              }
            ]}
            size="md"
          />

          <CollectionCardContainer
            cards={[
              {
                count: 140,
                description: "",
                id: "4",
                title: "Menoa ja meininkiä viikon lopuksi"
              },
              {
                count: 140,
                description: "",
                id: "5",
                title: "Vastinetta Netflixille"
              },
              {
                count: 140,
                description: "",
                id: "6",
                title: "Menoa ja meininkiä viikon lopuksi"
              },
              {
                count: 140,
                description: "",
                id: "7",
                title: "Vastinetta Netflixille"
              }
            ]}
            size="sm"
          />
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
