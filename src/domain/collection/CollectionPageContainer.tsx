import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import ErrorHero from '../../common/components/error/ErrorHero';
import PreviewBanner from '../../common/components/previewBanner/PreviewBanner';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import {
  CollectionFieldsFragment,
  useCollectionDetailsQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { ROUTES } from '../app/constants';
import PageWrapper from '../app/layout/PageWrapper';
import CollectionHero from './collectionHero/CollectionHero';
import styles from './collectionPage.module.scss';
import CollectionPageMeta from './collectionPageMeta/CollectionPageMeta';
import { isCollectionExpired, isLanguageSupported } from './CollectionUtils';
import CuratedEventList from './curatedEventList/CuratedEventList';
import EventList from './eventList/EventList';
import SimilarCollections from './similarCollections/SimilarCollections';

interface RouteParams {
  slug: string;
}

const CollectionPageContainer: React.FC = () => {
  const { search } = useLocation();
  const params = useParams<RouteParams>();

  const { t } = useTranslation();
  const locale = useLocale();
  const urlSearchParams = new URLSearchParams(search);
  const draft = urlSearchParams.get('draft') === 'true';

  const { data: collectionData, loading } = useCollectionDetailsQuery({
    variables: { draft, slug: params.slug },
  });
  const collection = collectionData && collectionData.collectionDetails;

  const getErrorHero = (collection?: CollectionFieldsFragment) => {
    if (!collection) {
      return (
        <ErrorHero
          text={t('collection.notFound.text')}
          title={t('collection.notFound.title')}
        >
          <Link to={`/${locale}${ROUTES.EVENTS}${search}`}>
            {t('collection.notFound.linkSearchEvents')}
          </Link>
        </ErrorHero>
      );
    }

    if (!isLanguageSupported(collection, locale)) {
      return (
        <ErrorHero
          text={t('collection.languageNotSupported.text')}
          title={t('collection.languageNotSupported.title')}
        >
          <Link to={`/${locale}${ROUTES.COLLECTIONS}`}>
            {t('collection.languageNotSupported.linkSearchEvents')}
          </Link>
        </ErrorHero>
      );
    }

    if (isCollectionExpired(collection)) {
      return (
        <ErrorHero
          text={t('collection.expired.text')}
          title={t('collection.expired.title')}
        >
          <Link to={`/${locale}${ROUTES.COLLECTIONS}`}>
            {t('collection.expired.linkSearchEvents')}
          </Link>
        </ErrorHero>
      );
    }
  };

  const errorHero = getErrorHero(collection);

  return (
    <PageWrapper
      className={styles.collectionPageWrapper}
      title="collection.title"
    >
      <LoadingSpinner isLoading={loading}>
        <>
          {!collection ? (
            errorHero
          ) : (
            <>
              <CollectionPageMeta collection={collection} />

              {errorHero ? (
                errorHero
              ) : (
                <>
                  {draft && <PreviewBanner />}
                  <CollectionHero collection={collection} />
                  <CuratedEventList collection={collection} />
                  <EventList collection={collection} />
                </>
              )}

              {/* Hide similar collections on preview */}
              {!draft && <SimilarCollections collection={collection} />}
            </>
          )}
        </>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default CollectionPageContainer;
