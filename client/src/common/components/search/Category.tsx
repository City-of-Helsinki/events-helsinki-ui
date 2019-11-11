import React, { FunctionComponent } from "react";

import { ReactComponent as CloseIcon } from "../../../assets/icons/svg/close.svg";
import { formatMessage } from "../../translation/utils";
import { Category as CategoryType } from "../../types";
import styles from "./category.module.scss";

interface Props {
  category: CategoryType;
  onRemove: (category: CategoryType) => void;
}

const Category: FunctionComponent<Props> = ({ category, onRemove }) => {
  const handleRemove = () => {
    onRemove(category);
  };

  return (
    <div className={styles.category}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={formatMessage("commons.category.ariaButtonRemove", {
          category: category.text
        })}
      >
        <CloseIcon />
      </button>
      {category.text}
    </div>
  );
};

export default Category;
