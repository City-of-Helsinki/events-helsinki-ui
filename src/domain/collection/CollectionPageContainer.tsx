import React from "react";
import { useParams } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useCollectionDetailsQuery } from "../../generated/graphql";
import isClient from "../../util/isClient";
import Layout from "../app/layout/Layout";
import CollectionHero from "./collectionHero/CollectionHero";
import styles from "./collectionPage.module.scss";
import CollectionPageMeta from "./collectionPageMeta/CollectionPageMeta";
import CuratedEventList from "./curatedEventList/CuratedEventList";
import EventList from "./eventList/EventList";
import SimilarCollections from "./similarCollections/SimilarCollections";

interface RouteParams {
  id: string;
}

const CollectionPageContainer: React.FC = () => {
  const params = useParams<RouteParams>();
  const { data: collectionData, loading } = useCollectionDetailsQuery({
    variables: { id: params.id }
  });

  React.useEffect(() => {
    // Scroll to top when collection changes. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Layout>
      <div className={styles.collectionPageWrapper}>
        <LoadingSpinner isLoading={loading}>
          {collectionData && (
            <>
              <CollectionPageMeta collectionData={collectionData} />
              <CollectionHero collectionData={collectionData} />
              <CuratedEventList collectionData={collectionData} />
              <EventList collectionData={collectionData} />
              <SimilarCollections collectionData={collectionData} />
            </>
          )}
        </LoadingSpinner>
      </div>
    </Layout>
  );
};

export default CollectionPageContainer;
