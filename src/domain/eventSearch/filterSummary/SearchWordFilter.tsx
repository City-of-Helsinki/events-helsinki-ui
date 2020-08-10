import { IconCrossCircle } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './searchWordFilter.module.scss';

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
        aria-label={t('eventSearch.filters.buttonRemoveSearchWord')}
        onClick={onRemove}
      >
        <IconCrossCircle />
      </button>
    </div>
  );
};

export default SearchWordFilter;
