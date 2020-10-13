import classNames from 'classnames';
import React from 'react';

import { CollectionFieldsFragment } from '../../../generated/graphql';
import CollectionCard, { CollectionCardSize } from './CollectionCard';
import styles from './collectionCards.module.scss';

export type CollectionCardListLayout = 'sm' | 'md' | 'mdAndSm' | 'lg';

const getCardSize = (
  index: number,
  layout: CollectionCardListLayout
): CollectionCardSize => {
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

interface Props {
  collections: CollectionFieldsFragment[];
  layout: CollectionCardListLayout;
}

const CollectionCards: React.FC<Props> = ({ collections, layout }) => {
  return (
    <div
      className={classNames(styles.collectionCards, styles[`${layout}Layout`])}
    >
      {collections.map((collection, index) => {
        return (
          <CollectionCard
            key={index}
            collection={collection}
            size={getCardSize(index, layout)}
          />
        );
      })}
    </div>
  );
};

export default CollectionCards;
