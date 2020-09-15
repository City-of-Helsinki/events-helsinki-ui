import React from 'react';
import { useTranslation } from 'react-i18next';

import CollectionCardContainer from '../../common/components/collectionCard/CollectionCardContainer';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import {
  useCollectionListQuery,
  useLandingPagesQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import {
  isCollectionExpired,
  isLanguageSupported,
} from '../collection/CollectionUtils';
import styles from './landingPage.module.scss';
import LandingPageHero from './landingPageHero/LandingPageHero';
import LandingPageMeta from './landingPageMeta/LandingPageMeta';
import Search from './landingPageSearch/LandingPageSearch';
import { isLanguageSupported as isLanguagePageLanguageSupported } from './utils';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const { data: landingPageData, loading } = useLandingPagesQuery({
    variables: { visibleOnFrontpage: true },
  });

  const { data: collectionsData } = useCollectionListQuery({
    variables: { visibleOnFrontpage: true },
  });

  const landingPage = landingPageData?.landingPages.data.find((page) =>
    isLanguagePageLanguageSupported(page, locale)
  );
  const collections = collectionsData
    ? collectionsData.collectionList.data.filter(
        (collection) =>
          isLanguageSupported(collection, locale) &&
          !isCollectionExpired(collection)
      )
    : [];
  const lgCollections = collections.slice(0, 1);
  const mdAndSmCollections = collections.slice(1);

  return (
    <PageWrapper>
      <LoadingSpinner isLoading={loading}>
        {!!landingPage && (
          <>
            <LandingPageMeta landingPage={landingPage} />
            <LandingPageHero landingPage={landingPage} />
          </>
        )}
        {!!collectionsData && (
          <MainContent offset={-150}>
            <Container className={styles.searchContainer}>
              <Search />
            </Container>
            <div className={styles.collectionCardContainer}>
              <Container>
                <div>
                  <h2>{t('home.collections.title')}</h2>
                  <CollectionCardContainer
                    collections={lgCollections}
                    layout="lg"
                  />
                  <CollectionCardContainer
                    collections={mdAndSmCollections}
                    layout="mdAndSm"
                  />
                </div>
              </Container>
            </div>
          </MainContent>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default Home;
