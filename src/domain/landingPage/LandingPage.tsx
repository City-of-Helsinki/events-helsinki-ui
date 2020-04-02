import React from "react";
import { useTranslation } from "react-i18next";

import CollectionCardContainer from "../../common/components/collectionCard/CollectionCardContainer";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import {
  useCollectionListQuery,
  useLandingPageQuery
} from "../../generated/graphql";
import Container from "../app/layout/Container";
import PageWrapper from "../app/layout/PageWrapper";
import styles from "./landingPage.module.scss";
import LandingPageHero from "./landingPageHero/LandingPageHero";
import LandingPageMeta from "./landingPageMeta/LandingPageMeta";
import Search from "./landingPageSearch/LandingPageSearch";

const Home: React.FC = () => {
  const { t } = useTranslation();

  const { data: landingPageData, loading } = useLandingPageQuery();
  const { data: collectionsData } = useCollectionListQuery();
  const collections = collectionsData
    ? collectionsData.collectionList.data
    : [];
  const lgCollections = collections.slice(0, 1);
  const mdCollections = collections.slice(1, 3);
  const smCollections = collections.slice(3);

  return (
    <PageWrapper>
      <LoadingSpinner isLoading={true}>
        {!!landingPageData && (
          <>
            <LandingPageMeta landingPageData={landingPageData} />
            <LandingPageHero landingPageData={landingPageData} />
            <Container>
              <Search />
            </Container>
            <div className={styles.collectionCardContainer}>
              <Container>
                <h2>{t("home.collections.title")}</h2>
                <CollectionCardContainer
                  collections={lgCollections}
                  layout="lg"
                />

                <CollectionCardContainer
                  collections={mdCollections}
                  layout="md"
                  showDescription={false}
                />

                <CollectionCardContainer
                  collections={smCollections}
                  layout="sm"
                  showDescription={false}
                />
              </Container>
            </div>
          </>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default Home;
