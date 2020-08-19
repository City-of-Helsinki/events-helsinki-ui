import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import FilterButton, {
  FilterType,
} from '../../../common/components/filterButton/FilterButton';
import { useNeighborhoodListQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { formatDate } from '../../../util/dateUtils';
import getLocalisedString from '../../../util/getLocalisedString';
import { translateValue } from '../../../util/translateUtils';
import { ROUTES } from '../../app/constants';
import { getSearchFilters, getSearchQuery } from '../utils';
import DateFilter from './DateFilter';
import styles from './filterSummary.module.scss';
import KeywordFilter from './KeywordFilter';
import PlaceFilter from './PlaceFilter';
import PublisherFilter from './PublisherFilter';
import SearchWordFilter from './SearchWordFilter';

interface Props {
  onClear: () => void;
}

const FilterSummary: React.FC<Props> = ({ onClear }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
  const {
    categories,
    dateTypes,
    divisions,
    end,
    isFree,
    keywordNot,
    keywords,
    onlyChildrenEvents,
    places,
    publisher,
    start,
    text,
  } = getSearchFilters(searchParams);

  const dateText =
    start || end
      ? `${start ? formatDate(start) : ''} - ${
          end ? formatDate(end) : ''
        }`.trim()
      : '';

  const { data: neighborhoodsData } = useNeighborhoodListQuery();

  const getNeighorhoodName = React.useCallback(
    (id: string) => {
      const neighborhoods = neighborhoodsData
        ? neighborhoodsData.neighborhoodList.data
        : [];
      const neighborhood = neighborhoods.find(item => item.id === id);
      return getLocalisedString(neighborhood ? neighborhood.name : {}, locale);
    },
    [locale, neighborhoodsData]
  );

  const handleFilterRemove = (value: string, type: FilterType) => {
    const search = getSearchQuery({
      categories:
        type === 'category'
          ? categories.filter(category => category !== value)
          : categories,
      dateTypes:
        type === 'dateType'
          ? dateTypes.filter(dateType => dateType !== value)
          : dateTypes,
      divisions:
        type === 'division'
          ? divisions.filter(division => division !== value)
          : divisions,
      end: type === 'date' ? null : end,
      isFree,
      keywordNot,
      keywords:
        type === 'keyword'
          ? keywords.filter(keyword => keyword !== value)
          : keywords,
      onlyChildrenEvents,
      places:
        type === 'place' ? places.filter(place => place !== value) : places,
      publisher: type !== 'publisher' ? publisher : null,
      start: type === 'date' ? null : start,
      text: type === 'searchWord' ? '' : text,
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const deleteSearchWord = () => {
    handleFilterRemove('', 'searchWord');
  };

  const hasFilters =
    !!publisher ||
    !!categories.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!divisions.length ||
    !!keywords.length ||
    !!places.length ||
    !!text;

  if (!hasFilters) return null;

  return (
    <div className={styles.filterSummary}>
      {!!text && (
        <SearchWordFilter onRemove={deleteSearchWord} searchWord={text} />
      )}
      {categories.map(category => (
        <FilterButton
          key={category}
          onRemove={handleFilterRemove}
          text={translateValue('home.category.', category, t)}
          type="category"
          value={category}
        />
      ))}
      {keywords.map(keyword => (
        <KeywordFilter
          key={keyword}
          onRemove={handleFilterRemove}
          id={keyword}
        />
      ))}
      {publisher && (
        <PublisherFilter id={publisher} onRemove={handleFilterRemove} />
      )}
      {divisions.map(division => (
        <FilterButton
          key={division}
          onRemove={handleFilterRemove}
          text={getNeighorhoodName(division)}
          type="division"
          value={division}
        />
      ))}
      {places.map(place => (
        <PlaceFilter key={place} id={place} onRemove={handleFilterRemove} />
      ))}

      {dateText && (
        <DateFilter
          onRemove={handleFilterRemove}
          text={dateText}
          type="date"
          value="date"
        />
      )}
      {dateTypes.map(dateType => (
        <DateFilter
          key={dateType}
          onRemove={handleFilterRemove}
          type="dateType"
          value={dateType}
        />
      ))}
      <button className={styles.clearButton} onClick={onClear} type="button">
        {t('eventSearch.buttonClearFilters')}
      </button>
    </div>
  );
};

export default FilterSummary;
