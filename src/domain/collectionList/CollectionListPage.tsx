import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { useCollectionListQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import CollectionCards from '../collection/collectionCard/CollectionCards';
import {
  isCollectionExpired,
  isLanguageSupported,
} from '../collection/CollectionUtils';
import styles from './collectionListPage.module.scss';

const CollectionListPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { data: collectionsData, loading } = useCollectionListQuery();

  const collections =
    collectionsData?.collectionList.data.filter(
      (collection) =>
        isLanguageSupported(collection, locale) &&
        !isCollectionExpired(collection)
    ) || [];
  const largeCollections = collections.slice(0, 1);
  const mdAndSmCollections = collections.slice(1);

  return (
    <PageWrapper
      className={styles.collectionListPage}
      title="collectionList.pageTitle"
    >
      <MainContent offset={-70}>
        <LoadingSpinner isLoading={loading}>
          <div className={styles.largeCardWrapper}>
            <Container>
              <h2>{t('collectionList.title')}</h2>
              <CollectionCards collections={largeCollections} layout="lg" />
            </Container>
          </div>
          <div className={styles.otherCardsWrapper}>
            <Container>
              <CollectionCards
                collections={mdAndSmCollections}
                layout="mdAndSm"
              />
            </Container>
          </div>
        </LoadingSpinner>
      </MainContent>
    </PageWrapper>
  );
};

export default CollectionListPage;
