import React from "react";
import { useTranslation } from "react-i18next";

import CollectionCardContainer from "../../../common/components/collectionCard/CollectionCardContainer";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import {
  CollectionDetailsQuery,
  useCollectionListQuery
} from "../../../generated/graphql";
import isClient from "../../../util/isClient";
import Container from "../../app/layout/Container";
import { SIMILAR_COLLECTIONS_AMOUNT } from "../constants";
import styles from "./similarCollections.module.scss";

interface Props {
  collectionData: CollectionDetailsQuery;
}

const SimilarCollections: React.FC<Props> = ({ collectionData }) => {
  const { t } = useTranslation();

  const { data: collectionsData, loading } = useCollectionListQuery({
    skip: !isClient
  });

  const collections =
    collectionsData && !!collectionsData.collectionList.data.length
      ? collectionsData.collectionList.data
          // Don't show current event on the list
          .filter(event => event.id !== collectionData.collectionDetails.id)
          .slice(0, SIMILAR_COLLECTIONS_AMOUNT)
      : [];

  return (
    <div className={styles.similarCollections}>
      <Container>
        <LoadingSpinner isLoading={loading}>
          {!!collections.length && (
            <>
              <h2>{t("collection.titleSimilarCollections")}</h2>
              <CollectionCardContainer collections={collections} layout="sm" />
            </>
          )}
        </LoadingSpinner>
      </Container>
    </div>
  );
};

export default SimilarCollections;
