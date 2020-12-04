import classNames from 'classnames';
import { IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import IconButton from '../../../common/components/iconButton/IconButton';
import { CollectionFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../../app/routes/constants';
import { getCollectionFields } from '../CollectionUtils';
import styles from './collectionCard.module.scss';

export type CollectionCardSize = 'sm' | 'md' | 'lg';

export interface Props {
  collection: CollectionFieldsFragment;
  size: CollectionCardSize;
}

const CollectionCard: React.FC<Props> = ({ collection, size }) => {
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);
  const {
    count,
    description,
    heroBackgroundImage: backgroundImage,
    slug,
    title,
  } = getCollectionFields(collection, locale);

  const collectionUrl = `/${locale}${ROUTES.COLLECTION.replace(
    ':slug',
    slug
  )}${search}`;

  const handleLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const target = ev.target;
    if (button.current?.contains(target as Node)) {
      ev.preventDefault();
    }
  };

  const moveToCollectionPage = () => {
    history.push(collectionUrl);
  };

  const showDescription = size === 'lg';

  return (
    <Link
      aria-label={t('collection.collectionCard.ariaLabelLink', {
        title,
      })}
      className={classNames(
        styles.collectionCardWrapper,
        styles[`${size}Size`]
      )}
      onClick={handleLinkClick}
      to={collectionUrl}
    >
      <div
        aria-hidden={true}
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className={styles.textWrapper}>
        <div className={styles.countWrapper}>
          <div className={styles.count}>
            {t('collection.collectionCard.count', { count })}
          </div>
        </div>

        <div className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>
          {showDescription && !!description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>

        <div className={styles.linkWrapper}>
          <div ref={button}>
            <IconButton
              ariaLabel={t('collection.collectionCard.ariaLabelLink', {
                title,
              })}
              aria-hidden={true}
              icon={<IconArrowRight aria-hidden/>}
              onClick={moveToCollectionPage}
              size="default"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
