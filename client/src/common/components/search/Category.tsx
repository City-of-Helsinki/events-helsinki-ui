import React, { FunctionComponent } from "react";

import { ReactComponent as CloseIcon } from "../../../assets/icons/svg/close.svg";
import { formatMessage } from "../../translation/utils";
import { Category as CategoryType } from "../../types";
import styles from "./category.module.scss";

interface Props {
  category: CategoryType;
  onBlur: () => void;
  onRemove: (category: CategoryType) => void;
}

const Category: FunctionComponent<Props> = ({ category, onBlur, onRemove }) => {
  const handleRemove = () => {
    onRemove(category);
  };

  return (
    <div className={styles.category}>
      <button
        type="button"
        className={styles.closeButton}
        onBlur={onBlur}
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
