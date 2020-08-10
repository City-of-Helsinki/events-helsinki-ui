import classNames from 'classnames';
import { IconAngleRight, ImageWithCard } from 'hds-react';
import React from 'react';

import TextWithLineBreaks from '../../../common/components/textWithLineBreaks/TextWithLineBreaks';
import { CollectionFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import CollectionShareLinks from '../collectionShareLinks/CollectionShareLinks';
import {
  getHeroBackgroundColor,
  getHeroBackgroundImage,
} from '../CollectionUtils';
import styles from './collectionHero.module.scss';

interface Props {
  collection: CollectionFieldsFragment;
}

const CollectionHero: React.FC<Props> = ({ collection }) => {
  const locale = useLocale();

  const title = getLocalisedString(collection.title, locale);

  const description = getLocalisedString(collection.description, locale);

  const linkUrl = getLocalisedString(collection.linkUrl, locale);

  const linkText = getLocalisedString(collection.linkText, locale);

  const backgroundColor = getHeroBackgroundColor(collection);

  const backgroundImage = getHeroBackgroundImage(collection);

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
