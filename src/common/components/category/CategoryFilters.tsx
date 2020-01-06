import React, { FunctionComponent } from "react";

import { Category } from "../../types";
import CategoryFilter from "./CategoryFilter";
import styles from "./categoryFilters.module.scss";

interface Props {
  categories: Array<Category>;
  hasHorizontalPadding?: boolean;
  onClickCategory: (category: Category) => void;
}

const CategoryFilters: FunctionComponent<Props> = ({
  categories,
  hasHorizontalPadding,
  onClickCategory
}) => {
  return (
    <div className={styles.categoryFilters}>
      {categories.map(category => (
        <CategoryFilter
          key={category.value}
          hasHorizontalPadding={hasHorizontalPadding}
          icon={category.icon}
          onClick={onClickCategory}
          text={category.text}
          value={category.value}
        />
      ))}
    </div>
  );
};

export default CategoryFilters;
