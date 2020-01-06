import React from "react";

import FilterButton, {
  FilterType
} from "../../common/components/filterButton/FilterButton";

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  value: string;
}

const CategotyFilter: React.FC<Props> = ({ onRemove, text, value }) => {
  return (
    <FilterButton
      onRemove={onRemove}
      text={text}
      type="category"
      value={value}
    />
  );
};

export default CategotyFilter;
