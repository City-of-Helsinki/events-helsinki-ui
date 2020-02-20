import classNames from "classnames";
import * as CSS from "csstype";
import { IconAngleRight } from "hds-react";
import React, { FunctionComponent } from "react";

import { Category } from "../../types";
import styles from "./categoryFilter.module.scss";

interface Props extends Category {
  className?: string;
  hasHorizontalPadding?: boolean;
  onClick: (category: Category) => void;
  style?: CSS.Properties;
}

const CategoryFilter: FunctionComponent<Props> = ({
  className,
  hasHorizontalPadding,
  icon,
  onClick,
  style,
  text,
  value
}) => {
  const handleClick = () => {
    onClick({ text, value });
  };

  return (
    <div
      className={classNames(
        styles.categoryFilter,
        {
          [styles.withHorizontalPadding]: hasHorizontalPadding
        },
        className
      )}
      style={style}
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
