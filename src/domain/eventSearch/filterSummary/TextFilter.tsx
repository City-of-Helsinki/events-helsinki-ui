import React from 'react';

import FilterButton from '../../../common/components/filterButton/FilterButton';
import { FilterType } from '../../../common/components/filterButton/types';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
}

const TextFilter: React.FC<Props> = ({ onRemove, text }) => (
  <FilterButton onRemove={onRemove} text={text} type="text" value={text} />
);

export default TextFilter;
