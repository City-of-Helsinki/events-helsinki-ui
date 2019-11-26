import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowRightIcon } from "../../../assets/icons/svg/arrow-right.svg";
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
          <div className={styles.count}>{count}</div>
        </div>

        <div className={styles.titleWrapper}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>

        <div className={styles.linkWrapper}>
          <Link to={`collection/${id}`}>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
