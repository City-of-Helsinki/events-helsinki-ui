import classNames from "classnames";
import React from "react";

import { CollectionDetails } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import CollectionCard, { CollectionCardSize } from "./CollectionCard";
import styles from "./collectionCardContainer.module.scss";

interface CollectionCardContainerProps {
  collections: CollectionDetails[];
  size: CollectionCardSize;
}

const CollectionCardContainer: React.FC<CollectionCardContainerProps> = ({
  collections,
  size
}) => {
  const locale = useLocale();
  return (
    <div
      className={classNames(
        styles.collectionCardContainer,
        styles[`${size}Size`]
      )}
    >
      {collections.map((collection, index) => {
        return (
          <CollectionCard
            key={index}
            count={collection.curatedEvents.length}
            description={getLocalisedString(collection.description, locale)}
            id={collection.id}
            size={size}
            title={getLocalisedString(collection.title, locale)}
          />
        );
      })}
    </div>
  );
};

export default CollectionCardContainer;
