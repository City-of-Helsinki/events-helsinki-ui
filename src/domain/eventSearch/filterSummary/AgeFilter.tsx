import React from 'react';
import { useTranslation } from 'react-i18next';

import FilterButton, {
  FilterType,
} from '../../../common/components/filterButton/FilterButton';

export interface AgeFilterProps {
  value: string;
  type: 'minAge' | 'maxAge';
  onRemove: (value: string, type: FilterType) => void;
}

const AgeFilter: React.FC<AgeFilterProps> = ({ value, type, onRemove }) => {
  const { t } = useTranslation();

  const texts = {
    minAge: 'ageLimitMin',
    maxAge: 'ageLimitMax',
  };

  return (
    <FilterButton
      onRemove={onRemove}
      text={`${t(`courseSearch.search.${texts[type]}`)} ${value} ${t(
        'commons.yearsShort'
      )}`}
      type={type}
      value={value}
    />
  );
};

export default AgeFilter;
