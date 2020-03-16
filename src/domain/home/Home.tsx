import React from "react";
import { useTranslation } from "react-i18next";

import CollectionCardContainer from "../../common/components/collectionCard/CollectionCardContainer";
import Hero from "../../common/components/hero/Hero";
import { useCollectionListQuery } from "../../generated/graphql";
import Container from "../app/layout/Container";
import PageWrapper from "../app/layout/PageWrapper";
import styles from "./home.module.scss";
import Search from "./Search";

const Home: React.FC = () => {
  const { t } = useTranslation();

  const { data: collectionsData } = useCollectionListQuery({ ssr: false });
  const collections = collectionsData
    ? collectionsData.collectionList.data
    : [];
  const lgCollections = collections.slice(0, 1);
  const mdCollections = collections.slice(1, 3);
  const smCollections = collections.slice(3);

  return (
    <PageWrapper>
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
          <CollectionCardContainer collections={lgCollections} size="lg" />

          <CollectionCardContainer collections={mdCollections} size="md" />

          <CollectionCardContainer collections={smCollections} size="sm" />
        </Container>
      </div>
    </PageWrapper>
  );
};

export default Home;
