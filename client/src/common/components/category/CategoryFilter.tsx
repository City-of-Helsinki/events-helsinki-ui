import React, { FunctionComponent, ReactElement } from "react";

import { ReactComponent as AngleIcon } from "../../../assets/icons/svg/angle-right.svg";
import styles from "./categoryFilter.module.scss";

export interface CategoryFilterType {
  icon: ReactElement;
  onClick: (value: string) => void;
  text: string;
  value: string;
}

const CategoryFilter: FunctionComponent<CategoryFilterType> = ({
  icon,
  onClick,
  text,
  value
}) => {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <div className={styles.categoryFilter}>
      <button onClick={handleClick}>
        {icon}
        <span>{text}</span>
        <AngleIcon />
      </button>
    </div>
  );
};

export default CategoryFilter;
