import classNames from "classnames";
import React from "react";

import { CollectionDetails } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import CollectionCard, { CollectionCardSize } from "./CollectionCard";
import styles from "./collectionCardContainer.module.scss";

export type CollectionCardListLayout = "sm" | "md" | "mdAndSm" | "lg";

interface CollectionCardContainerProps {
  collections: CollectionDetails[];
  layout: CollectionCardListLayout;
}

const CollectionCardContainer: React.FC<CollectionCardContainerProps> = ({
  collections,
  layout
}) => {
  const locale = useLocale();
  return (
    <div
      className={classNames(
        styles.collectionCardContainer,
        styles[`${layout}Layout`]
      )}
    >
      {collections.map((collection, index) => {
        const getCardSize = (): CollectionCardSize => {
          switch (layout) {
            case "sm":
              return "sm";
            case "md":
              return "md";
            case "mdAndSm":
              if (index % 5 === 0 || index % 5 === 4) {
                return "md";
              }
              return "sm";
            case "lg":
              return "lg";
          }
        };
        const size = getCardSize();
        return (
          <CollectionCard
            key={index}
            count={collection.curatedEvents.length}
            description={getLocalisedString(collection.description, locale)}
            id={collection.id}
            size={size}
            showDescription={size === "lg"}
            title={getLocalisedString(collection.title, locale)}
          />
        );
      })}
    </div>
  );
};

export default CollectionCardContainer;
