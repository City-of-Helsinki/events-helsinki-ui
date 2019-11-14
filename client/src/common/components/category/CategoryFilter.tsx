import classNames from "classnames";
import React, { FunctionComponent } from "react";

import { ReactComponent as AngleRightIcon } from "../../../assets/icons/svg/angle-right.svg";
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
        <AngleRightIcon />
      </button>
    </div>
  );
};

export default CategoryFilter;
