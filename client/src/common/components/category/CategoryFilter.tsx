import React, { FunctionComponent } from "react";

import { ReactComponent as AngleIcon } from "../../../assets/icons/svg/angle-right.svg";
import { Category } from "../../types";
import styles from "./categoryFilter.module.scss";

interface Props extends Category {
  onClick: (category: Category) => void;
}

const CategoryFilter: FunctionComponent<Props> = ({
  icon,
  onClick,
  text,
  value
}) => {
  const handleClick = () => {
    onClick({ text, value });
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
