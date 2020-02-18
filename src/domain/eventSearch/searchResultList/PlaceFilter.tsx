import React from "react";
import { useTranslation } from "react-i18next";

import FilterButton, {
  FilterType
} from "../../../common/components/filterButton/FilterButton";
import { usePlaceDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const PublisherFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { data, loading } = usePlaceDetailsQuery({
    variables: { id }
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t("commons.loading")}
      type="place"
      value={id}
    />
  ) : data && data.placeDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={getLocalisedString(data.placeDetails.name, locale)}
      type="place"
      value={id}
    />
  ) : null;
};

export default PublisherFilter;
