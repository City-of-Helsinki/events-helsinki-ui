import classNames from "classnames";
import React from "react";

import CollectionCard, {
  CollectionCardSize,
  CollectionCardType
} from "./CollectionCard";
import styles from "./collectionCardContainer.module.scss";

interface CollectionCardContainerProps {
  cards: CollectionCardType[];
  size: CollectionCardSize;
}

const CollectionCardContainer: React.FC<CollectionCardContainerProps> = ({
  cards,
  size
}) => {
  return (
    <div
      className={classNames(
        styles.collectionCardContainer,
        styles[`${size}Size`]
      )}
    >
      {cards.map(card => {
        return (
          <CollectionCard
            count={card.count}
            description={card.description}
            id={card.id}
            size={size}
            title={card.title}
          />
        );
      })}
    </div>
  );
};

export default CollectionCardContainer;
