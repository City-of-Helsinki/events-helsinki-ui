import React from "react";

import CollectionCardContainer from "../../../common/components/collectionCard/CollectionCardContainer";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import {
  CollectionDetailsQuery,
  useCollectionListQuery
} from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import isClient from "../../../util/isClient";
import Container from "../../app/layout/Container";
import { SIMILAR_COLLECTIONS_AMOUNT } from "../constants";
import styles from "./similarCollections.module.scss";

interface Props {
  collectionData: CollectionDetailsQuery;
}

const SimilarCollections: React.FC<Props> = ({ collectionData }) => {
  const locale = useLocale();

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
              {collectionData.collectionDetails.similarCollectionsTitle && (
                <h2>
                  {getLocalisedString(
                    collectionData.collectionDetails.similarCollectionsTitle,
                    locale
                  )}
                </h2>
              )}

              <CollectionCardContainer size="sm" collections={collections} />
            </>
          )}
        </LoadingSpinner>
      </Container>
    </div>
  );
};

export default SimilarCollections;
