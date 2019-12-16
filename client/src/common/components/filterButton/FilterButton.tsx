import React from "react";
import { useTranslation } from "react-i18next";

import CloseIcon from "../../../icons/CloseIcon";
import styles from "./filterButton.module.scss";

export type FilterType = "category" | "publisher";

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: FilterType;
  value: string;
}

const FilterButton: React.FC<Props> = ({ onRemove, text, type, value }) => {
  const { t } = useTranslation();

  const handleRemove = () => {
    onRemove(value, type);
  };

  return (
    <div className={styles.filter}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={t("commons.filter.ariaButtonRemove", {
          filter: text
        })}
      >
        <CloseIcon />
      </button>
      {text}
    </div>
  );
};

export default FilterButton;
