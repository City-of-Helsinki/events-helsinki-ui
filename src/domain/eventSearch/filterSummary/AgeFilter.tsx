import React from 'react';
import { useTranslation } from 'react-i18next';

import FilterButton from '../../../common/components/filterButton/FilterButton';
import { FilterType } from '../../../common/components/filterButton/types';

export interface AgeFilterProps {
  value: string;
  type: 'minAge' | 'maxAge' | 'exactAge';
  onRemove: (value: string, type: FilterType) => void;
}

const AgeFilter: React.FC<AgeFilterProps> = ({ value, type, onRemove }) => {
  const { t } = useTranslation();

  return (
    <FilterButton
      onRemove={onRemove}
      text={t(`courseSearch.search.ageFilter.${type}`, {
        age: value,
        yearAbbr: t('commons.yearsShort'),
      })}
      type={type}
      value={value}
    />
  );
};

export default AgeFilter;
