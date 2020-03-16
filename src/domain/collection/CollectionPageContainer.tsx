import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

import ErrorHero from "../../common/components/error/ErrorHero";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useCollectionDetailsQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import isClient from "../../util/isClient";
import PageLayout from "../app/layout/PageLayout";
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
  const { search } = useLocation();
  const params = useParams<RouteParams>();
  const { t } = useTranslation();
  const locale = useLocale();

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
    <PageLayout>
      <div className={styles.collectionPageWrapper}>
        <LoadingSpinner isLoading={loading}>
          {collectionData ? (
            <>
              <CollectionPageMeta collectionData={collectionData} />
              <CollectionHero collectionData={collectionData} />
              <CuratedEventList collectionData={collectionData} />
              <EventList collectionData={collectionData} />
              <SimilarCollections collectionData={collectionData} />
            </>
          ) : (
            <ErrorHero
              text={t("collection.notFound.text")}
              title={t("collection.notFound.title")}
            >
              <Link to={`/${locale}/events${search}`}>
                {t("collection.notFound.linkSearchEvents")}
              </Link>
            </ErrorHero>
          )}
        </LoadingSpinner>
      </div>
    </PageLayout>
  );
};

export default CollectionPageContainer;
