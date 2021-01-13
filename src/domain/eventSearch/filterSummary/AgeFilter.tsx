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
  const text = type === 'minAge' ? 'ageLimitMin' : 'ageLimitMax';

  return (
    <FilterButton
      onRemove={onRemove}
      text={`${t(`courseSearch.search.${text}`)} ${value} ${t(
        'commons.yearsShort'
      )}`}
      type={type}
      value={value}
    />
  );
};

export default AgeFilter;
