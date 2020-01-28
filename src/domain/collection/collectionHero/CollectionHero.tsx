import { IconAngleRight, ImageWithCard } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";

import bgImage from "../../../assets/images/png/collection-background.png";
import { CollectionDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import styles from "./collectionHero.module.scss";

interface Props {
  collectionData: CollectionDetailsQuery;
}

const CollectionHero: React.FC<Props> = ({ collectionData }) => {
  const locale = useLocale();
  const { t } = useTranslation();

  return (
    <div className={styles.collectionHero}>
      <ImageWithCard
        className={styles.imageWithCard}
        src={bgImage}
        cardLayout="hover"
        color="tertiary"
      >
        <h2>
          {getLocalisedString(collectionData.collectionDetails.title, locale)}
        </h2>
        <h3>
          {getLocalisedString(
            collectionData.collectionDetails.shortDescription,
            locale
          )}
        </h3>
        <p>
          {getLocalisedString(
            collectionData.collectionDetails.description,
            locale
          )}
        </p>
        <a
          href={getLocalisedString(
            collectionData.collectionDetails.link.url,
            locale
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getLocalisedString(
            collectionData.collectionDetails.link.text,
            locale
          )}
          <IconAngleRight className={styles.linkIcon} />
        </a>
      </ImageWithCard>
    </div>
  );
};

export default CollectionHero;
