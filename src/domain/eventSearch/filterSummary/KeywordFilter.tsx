import React from 'react';
import { useTranslation } from 'react-i18next';

import FilterButton, {
  FilterType,
} from '../../../common/components/filterButton/FilterButton';
import { useKeywordDetailsQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const KeywordFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { data, loading } = useKeywordDetailsQuery({
    variables: { id },
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('commons.loading')}
      type="keyword"
      value={id}
    />
  ) : data && data.keywordDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={getLocalisedString(data.keywordDetails.name, locale)}
      type="keyword"
      value={id}
    />
  ) : null;
};

export default KeywordFilter;
