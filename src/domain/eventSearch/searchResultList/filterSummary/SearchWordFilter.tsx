import React from "react";
import { useTranslation } from "react-i18next";

import IconDelete from "../../../../icons/IconDelete";
import styles from "./searchWordFilter.module.scss";

interface Props {
  onRemove: () => void;
  searchWord: string;
}

const SearchWordFilter: React.FC<Props> = ({ onRemove, searchWord }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.searchWordFilter}>
      <div>‘{searchWord}’</div>
      <button
        aria-label={t("eventSearch.filters.buttonRemoveSearchWord")}
        onClick={onRemove}
      >
        <IconDelete />
      </button>
    </div>
  );
};

export default SearchWordFilter;
