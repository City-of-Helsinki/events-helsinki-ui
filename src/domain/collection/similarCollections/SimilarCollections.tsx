import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  CollectionFieldsFragment,
  useCollectionListQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import isClient from '../../../util/isClient';
import Container from '../../app/layout/Container';
import CollectionCards from '../collectionCard/CollectionCards';
import { isCollectionExpired, isLanguageSupported } from '../CollectionUtils';
import { SIMILAR_COLLECTIONS_AMOUNT } from '../constants';
import styles from './similarCollections.module.scss';

interface Props {
  collection: CollectionFieldsFragment;
}

const SimilarCollections: React.FC<Props> = ({ collection }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const { data: collectionsData, loading } = useCollectionListQuery({
    skip: !isClient,
  });

  const collections =
    collectionsData?.collectionList.data
      .filter(
        (item) =>
          !isCollectionExpired(item) &&
          isLanguageSupported(item, locale) &&
          // Don't show current collection on the list
          item.id !== collection.id
      )
      .slice(0, SIMILAR_COLLECTIONS_AMOUNT) || [];

  return (
    <div className={styles.similarCollections}>
      <Container>
        <LoadingSpinner hasPadding={false} isLoading={loading}>
          {!!collections.length && (
            <>
              <h2>{t('collection.titleSimilarCollections')}</h2>
              <CollectionCards collections={collections} layout="sm" />
            </>
          )}
        </LoadingSpinner>
      </Container>
    </div>
  );
};

export default SimilarCollections;
