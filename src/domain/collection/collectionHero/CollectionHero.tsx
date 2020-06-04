import classNames from "classnames";
import { IconAngleRight, ImageWithCard } from "hds-react";
import React from "react";

import TextWithLineBreaks from "../../../common/components/textWithLineBreaks/TextWithLineBreaks";
import { CollectionDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import CollectionShareLinks from "../collectionShareLinks/CollectionShareLinks";
import {
  getHeroBackgroundColor,
  getHeroBackgroundImage
} from "../CollectionUtils";
import styles from "./collectionHero.module.scss";

interface Props {
  collectionData: CollectionDetailsQuery;
}

const CollectionHero: React.FC<Props> = ({ collectionData }) => {
  const locale = useLocale();

  const title = getLocalisedString(
    collectionData.collectionDetails.title,
    locale
  );

  const description = getLocalisedString(
    collectionData.collectionDetails.description,
    locale
  );

  const linkUrl = getLocalisedString(
    collectionData.collectionDetails.linkUrl,
    locale
  );

  const linkText = getLocalisedString(
    collectionData.collectionDetails.linkText,
    locale
  );

  const backgroundColor = getHeroBackgroundColor(
    collectionData.collectionDetails
  );

  const backgroundImage = getHeroBackgroundImage(
    collectionData.collectionDetails
  );

  return (
    <div className={styles.collectionHero}>
      <ImageWithCard
        className={classNames(
          styles.imageWithCard,
          styles[`${backgroundColor}BackgroundColor`]
        )}
        src={backgroundImage}
        cardLayout="hover"
        color="primary"
      >
        <h1>{title}</h1>
        {!!description && <TextWithLineBreaks as="p" text={description} />}
        {!!linkText && !!linkText && (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkText}
            <IconAngleRight className={styles.linkIcon} />
          </a>
        )}

        <CollectionShareLinks />
      </ImageWithCard>
    </div>
  );
};

export default CollectionHero;
