import React from "react";
import { useTranslation } from "react-i18next";

import FilterButton, {
  FilterType
} from "../../common/components/filterButton/FilterButton";
import { translateValue } from "../../util/translateUtils";

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text?: string;
  type: "date" | "dateType";
  value: string;
}

const PublisherFilter: React.FC<Props> = ({ onRemove, text, type, value }) => {
  const { t } = useTranslation();

  return (
    <FilterButton
      onRemove={onRemove}
      text={text || translateValue("commons.dateSelector.dateType", value, t)}
      type={type}
      value={value}
    />
  );
};

export default PublisherFilter;
