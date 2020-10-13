import React from 'react';

import FilterButton, {
  FilterType,
} from '../../../common/components/filterButton/FilterButton';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
}

const TextFilter: React.FC<Props> = ({ onRemove, text }) => (
  <FilterButton onRemove={onRemove} text={text} type="text" value={text} />
);

export default TextFilter;
