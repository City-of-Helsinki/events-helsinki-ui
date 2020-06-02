import classNames from "classnames";
import { IconArrowRight } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { ROUTES } from "../../../domain/app/constants";
import useLocale from "../../../hooks/useLocale";
import IconLink from "../../components/link/IconLink";
import SrOnly from "../srOnly/SrOnly";
import TruncatedText from "../truncatedText/TruncatedText";
import styles from "./collectionCard.module.scss";

export interface CollectionCardType {
  backgroundImage: string;
  count: number;
  description: string;
  id: string;
  showDescription?: boolean;
  title: string;
}

export type CollectionCardSize = "sm" | "md" | "lg";

interface CollectionCardProps extends CollectionCardType {
  size: CollectionCardSize;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  backgroundImage,
  count,
  description,
  id,
  size,
  showDescription = true,
  title
}) => {
  const { search } = useLocation();
  const { t } = useTranslation();
  const locale = useLocale();

  const collectionUrl = React.useMemo(() => {
    return `/${locale}${ROUTES.COLLECTION.replace(":id", id)}${search}`;
  }, [id, locale, search]);

  return (
    <div
      className={classNames(
        styles.collectionCardWrapper,
        styles[`${size}Size`]
      )}
    >
      <Link
        aria-hidden={true}
        aria-label={t("commons.eventCard.ariaLabelLink", {
          title
        })}
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        tabIndex={-1}
        to={collectionUrl}
      ></Link>
      <div className={styles.textWrapper}>
        <div className={styles.countWrapper}>
          <div className={styles.count}>
            {t("commons.collectionCard.count", { count })}
          </div>
        </div>

        <div className={styles.titleWrapper}>
          <Link
            aria-hidden={true}
            className={styles.title}
            tabIndex={-1}
            to={collectionUrl}
          >
            {title}
          </Link>
          <SrOnly>{title}</SrOnly>
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
          <IconLink
            aria-label={t("commons.collectionCard.ariaLabelLink", {
              title
            })}
            icon={<IconArrowRight />}
            to={collectionUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
