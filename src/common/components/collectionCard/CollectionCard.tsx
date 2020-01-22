import classNames from "classnames";
import { IconArrowRight } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./collectionCard.module.scss";

export interface CollectionCardType {
  count: number;
  description: string;
  id: string;
  title: string;
}

export type CollectionCardSize = "sm" | "md" | "lg";

interface CollectionCardProps extends CollectionCardType {
  size: CollectionCardSize;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  count,
  description,
  id,
  size,
  title
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        styles.collectionCardWrapper,
        styles[`${size}Size`]
      )}
    >
      <div className={styles.imageWrapper}></div>
      <div className={styles.textWrapper}>
        <div className={styles.countWrapper}>
          <div className={styles.count}>
            {t("commons.collectionCard.count", { count })}
          </div>
        </div>

        <div className={styles.titleWrapper}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>

        <div className={styles.linkWrapper}>
          <Link to={`collection/${id}`}>
            <IconArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
