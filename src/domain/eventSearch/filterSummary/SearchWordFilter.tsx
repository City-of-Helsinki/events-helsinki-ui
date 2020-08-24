import { IconCrossCircle } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { FilterType } from '../../../common/components/filterButton/FilterButton';
import styles from './searchWordFilter.module.scss';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
}

const SearchWordFilter: React.FC<Props> = ({ onRemove, text }) => {
  const { t } = useTranslation();

  const handleRemove = () => {
    onRemove(text, 'searchWord');
  };

  return (
    <div className={styles.searchWordFilter}>
      <div>‘{text}’</div>
      <button
        aria-label={t('commons.filter.ariaButtonRemove', {
          filter: text,
        })}
        onClick={handleRemove}
      >
        <IconCrossCircle />
      </button>
    </div>
  );
};

export default SearchWordFilter;
