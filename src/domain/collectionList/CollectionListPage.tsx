import React from "react";
import { useTranslation } from "react-i18next";

import CollectionCardContainer from "../../common/components/collectionCard/CollectionCardContainer";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useCollectionListQuery } from "../../generated/graphql";
import Container from "../app/layout/Container";
import PageWrapper from "../app/layout/PageWrapper";
import styles from "./collectionListPage.module.scss";

interface RouteParams {
  id: string;
}

const CollectionListPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: collectionsData, loading } = useCollectionListQuery();

  const collections = collectionsData
    ? collectionsData.collectionList.data
    : [];
  const largeCollections = collections.slice(0, 1);
  const mdAndSmCollections = collections.slice(1);

  return (
    <PageWrapper
      className={styles.collectionListPage}
      title="collectionList.pageTitle"
    >
      <LoadingSpinner isLoading={loading}>
        <div className={styles.largeCardWrapper}>
          <Container>
            <h2>{t("collectionList.title")}</h2>
            <CollectionCardContainer
              collections={largeCollections}
              layout="lg"
            />
          </Container>
        </div>
        <div className={styles.otherCardsWrapper}>
          <Container>
            <CollectionCardContainer
              collections={mdAndSmCollections}
              layout="mdAndSm"
            />
          </Container>
        </div>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default CollectionListPage;
