import React, { FunctionComponent } from "react";

import CategoryFilter, { CategoryFilterType } from "./CategoryFilter";
import styles from "./categoryFilters.module.scss";

interface Props {
  categories: Array<CategoryFilterType>;
}

const CategoryFilters: FunctionComponent<Props> = ({ categories }) => {
  return (
    <div className={styles.categoryFilters}>
      {categories.map(category => (
        <CategoryFilter
          key={category.value}
          icon={category.icon}
          onClick={category.onClick}
          text={category.text}
          value={category.value}
        />
      ))}
    </div>
  );
};

export default CategoryFilters;
