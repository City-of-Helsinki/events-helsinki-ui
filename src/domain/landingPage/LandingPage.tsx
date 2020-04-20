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
  const { data: collectionsData } = useCollectionListQuery({
    variables: { visibleOnFrontpage: true }
  });
  const collections = collectionsData
    ? collectionsData.collectionList.data
    : [];
  const lgCollections = collections.slice(0, 1);
  // TODO: Change back after demo
  // const mdAndSmCollections = collections.slice(1, 7);
  const mdAndSmCollections = collections.slice(1, -1);

  return (
    <PageWrapper>
      <LoadingSpinner isLoading={loading}>
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
                  collections={mdAndSmCollections}
                  layout="mdAndSm"
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
