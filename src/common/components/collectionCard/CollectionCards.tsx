import classNames from 'classnames';
import React from 'react';

import { getCollectionFields } from '../../../domain/collection/CollectionUtils';
import { CollectionFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import CollectionCard, { CollectionCardSize } from './CollectionCard';
import styles from './collectionCards.module.scss';

export type CollectionCardListLayout = 'sm' | 'md' | 'mdAndSm' | 'lg';

interface Props {
  collections: CollectionFieldsFragment[];
  layout: CollectionCardListLayout;
}

const CollectionCards: React.FC<Props> = ({ collections, layout }) => {
  const locale = useLocale();
  return (
    <div
      className={classNames(styles.collectionCards, styles[`${layout}Layout`])}
    >
      {collections.map((collection, index) => {
        const getCardSize = (): CollectionCardSize => {
          switch (layout) {
            case 'mdAndSm':
              if (index % 5 === 0 || index % 5 === 4) {
                return 'md';
              }
              return 'sm';
            default:
              return layout;
          }
        };
        const size = getCardSize();

        const {
          description,
          heroBackgroundImage: backgroundImage,
          slug,
          title,
        } = getCollectionFields(collection, locale);

        return (
          <CollectionCard
            key={index}
            backgroundImage={backgroundImage}
            count={collection.curatedEvents.length}
            description={description}
            slug={slug}
            size={size}
            showDescription={size === 'lg'}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default CollectionCards;
