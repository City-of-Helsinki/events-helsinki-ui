import classNames from "classnames";
import { IconAngleRight } from "hds-react";
import React, { FunctionComponent } from "react";

import { Category } from "../../types";
import styles from "./categoryFilter.module.scss";

interface Props extends Category {
  hasHorizontalPadding?: boolean;
  onClick: (category: Category) => void;
}

const CategoryFilter: FunctionComponent<Props> = ({
  hasHorizontalPadding,
  icon,
  onClick,
  text,
  value
}) => {
  const handleClick = () => {
    onClick({ text, value });
  };

  return (
    <div
      className={classNames(styles.categoryFilter, {
        [styles.withHorizontalPadding]: hasHorizontalPadding
      })}
    >
      <button onClick={handleClick}>
        {icon}
        <span>{text}</span>
        <IconAngleRight />
      </button>
    </div>
  );
};

export default CategoryFilter;
