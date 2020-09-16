import classNames from 'classnames';
import { IconArrowRight } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../domain/app/constants';
import useLocale from '../../../hooks/useLocale';
import IconButton from '../../components/iconButton/IconButton';
import TruncatedText from '../truncatedText/TruncatedText';
import styles from './collectionCard.module.scss';

export interface CollectionCardType {
  backgroundImage: string;
  count: number;
  description: string;
  showDescription?: boolean;
  slug: string;
  title: string;
}

export type CollectionCardSize = 'sm' | 'md' | 'lg';

export interface CollectionCardProps extends CollectionCardType {
  size: CollectionCardSize;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  backgroundImage,
  count,
  description,
  size,
  slug,
  showDescription = true,
  title,
}) => {
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);

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

  return (
    <Link
      aria-label={t('commons.collectionCard.ariaLabelLink', {
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
            {t('commons.collectionCard.count', { count })}
          </div>
        </div>

        <div className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>
          {showDescription && !!description && (
            <TruncatedText
              as="div"
              className={styles.description}
              maxLength={120}
              text={description}
            />
          )}
        </div>

        <div className={styles.linkWrapper}>
          <div ref={button}>
            <IconButton
              ariaLabel={t('commons.collectionCard.ariaLabelLink', {
                title,
              })}
              aria-hidden={true}
              icon={<IconArrowRight />}
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
