import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

import ErrorHero from "../../common/components/error/ErrorHero";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useCollectionDetailsQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import PageWrapper from "../app/layout/PageWrapper";
import CollectionHero from "./collectionHero/CollectionHero";
import styles from "./collectionPage.module.scss";
import CollectionPageMeta from "./collectionPageMeta/CollectionPageMeta";
import { isLanguageSupported } from "./CollectionUtils";
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

  return (
    <PageWrapper
      className={styles.collectionPageWrapper}
      title="collection.title"
    >
      <LoadingSpinner isLoading={loading}>
        {collectionData ? (
          <>
            {!!isLanguageSupported(collectionData.collectionDetails, locale) ? (
              <>
                <CollectionPageMeta collectionData={collectionData} />
                <CollectionHero collectionData={collectionData} />
                <CuratedEventList collectionData={collectionData} />
                <EventList collectionData={collectionData} />
                <SimilarCollections collectionData={collectionData} />
              </>
            ) : (
              <>
                <ErrorHero
                  text={t("collection.languageNotSupported.text")}
                  title={t("collection.languageNotSupported.title")}
                >
                  <Link to={`/${locale}/collections`}>
                    {t("collection.languageNotSupported.linkSearchEvents")}
                  </Link>
                </ErrorHero>
                <SimilarCollections collectionData={collectionData} />
              </>
            )}
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
    </PageWrapper>
  );
};

export default CollectionPageContainer;
