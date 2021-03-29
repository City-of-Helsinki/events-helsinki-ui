import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import ErrorHero from '../../common/components/error/ErrorHero';
import PreviewBanner from '../../common/components/previewBanner/PreviewBanner';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import {
  CollectionFieldsFragment,
  useCollectionDetailsQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import { getLargeEventCardId } from '../event/EventUtils';
import CollectionHero from './collectionHero/CollectionHero';
import styles from './collectionPage.module.scss';
import CollectionPageMeta from './collectionPageMeta/CollectionPageMeta';
import { isCollectionExpired, isLanguageSupported } from './CollectionUtils';
import CuratedEvents from './curatedEvents/CuratedEvents';
import EventList from './eventList/EventList';
import SimilarCollections from './similarCollections/SimilarCollections';

interface RouteParams {
  slug: string;
}

type Error = {
  linkText: string;
  smallMargin: boolean;
  text: string;
  title: string;
  url: string;
};

const CollectionPageContainer: React.FC = () => {
  const { search } = useLocation();
  const params = useParams<RouteParams>();
  const location = useLocation();
  const history = useHistory();

  const { t } = useTranslation();
  const locale = useLocale();
  const urlSearchParams = new URLSearchParams(search);
  const draft = urlSearchParams.get('draft') === 'true';

  const { data: collectionData, loading } = useCollectionDetailsQuery({
    variables: { draft, slug: params.slug },
  });
  const collection = collectionData && collectionData.collectionDetails;

  const getError = (collection?: CollectionFieldsFragment): Error | null => {
    if (!collection) {
      return {
        linkText: t('collection.notFound.linkSearchEvents'),
        smallMargin: false,
        text: t('collection.notFound.text'),
        title: t('collection.notFound.title'),
        url: `/${locale}${ROUTES.EVENTS}${search}`,
      };
    }

    if (!isLanguageSupported(collection, locale)) {
      return {
        linkText: t('collection.languageNotSupported.linkSearchEvents'),
        smallMargin: true,
        text: t('collection.languageNotSupported.text'),
        title: t('collection.languageNotSupported.title'),
        url: `/${locale}${ROUTES.COLLECTIONS}`,
      };
    }

    if (isCollectionExpired(collection)) {
      return {
        linkText: t('collection.expired.linkSearchEvents'),
        smallMargin: true,
        text: t('collection.expired.text'),
        title: t('collection.expired.title'),
        url: `/${locale}${ROUTES.COLLECTIONS}`,
      };
    }

    return null;
  };

  const scrollToEventCard = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  // Scroll back to correct event card (event that user is coming back from)
  React.useEffect(() => {
    if (location.state?.eventId) {
      const cardId = getLargeEventCardId(location.state.eventId);
      scrollToEventCard(cardId);
      // Clear eventId value to keep scroll position correctly
      const state = { ...location.state };
      delete state.eventId;
      history.replace({ ...location, state });
    }
  }, [history, location]);

  const renderErrorHero = (error: Error) => {
    return (
      <ErrorHero
        text={error.text}
        smallMargin={error.smallMargin}
        title={error.title}
      >
        <Link to={error.url}>{error.linkText}</Link>
      </ErrorHero>
    );
  };

  const error = getError(collection);

  return (
    <PageWrapper
      className={styles.collectionPageWrapper}
      title="collection.title"
    >
      <MainContent offset={-70}>
        <LoadingSpinner isLoading={loading}>
          {!!collection && <CollectionPageMeta collection={collection} />}
          {error
            ? renderErrorHero(error)
            : !!collection && (
                <>
                  {draft && <PreviewBanner />}
                  <CollectionHero collection={collection} />
                  <CuratedEvents collection={collection} />
                  <EventList collection={collection} />
                </>
              )}
          {!!collection && !draft && (
            <SimilarCollections collection={collection} />
          )}
        </LoadingSpinner>
      </MainContent>
    </PageWrapper>
  );
};

export default CollectionPageContainer;
