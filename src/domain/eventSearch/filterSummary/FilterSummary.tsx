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
import getUrlParamAsArray from '../../../util/getUrlParamAsArray';
import { getSearchQuery } from '../../../util/searchUtils';
import { translateValue } from '../../../util/translateUtils';
import { ROUTES } from '../../app/constants';
import { EVENT_SEARCH_FILTERS } from '../constants';
import DateFilter from './DateFilter';
import styles from './filterSummary.module.scss';
import KeywordFilter from './KeywordFilter';
import PlaceFilter from './PlaceFilter';
import PublisherFilter from './PublisherFilter';
import SearchWordFilter from './SearchWordFilter';

const FilterSummary = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
  const publisher = searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER);
  const categories = getUrlParamAsArray(
    searchParams,
    EVENT_SEARCH_FILTERS.CATEGORIES
  );
  const dateTypes = getUrlParamAsArray(
    searchParams,
    EVENT_SEARCH_FILTERS.DATE_TYPES
  );
  const divisions = getUrlParamAsArray(
    searchParams,
    EVENT_SEARCH_FILTERS.DIVISIONS
  );
  const isFree =
    searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true' ? true : false;
  const onlyChildrenEvents =
    searchParams.get(EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS) === 'true'
      ? true
      : false;
  const keywords = getUrlParamAsArray(
    searchParams,
    EVENT_SEARCH_FILTERS.KEYWORDS
  );
  const places = getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES);
  const start = searchParams.get(EVENT_SEARCH_FILTERS.START);
  const end = searchParams.get(EVENT_SEARCH_FILTERS.END);
  const searchWord = searchParams.get(EVENT_SEARCH_FILTERS.TEXT);
  const dateText =
    start || end
      ? `${start ? formatDate(new Date(start)) : ''} - ${
          end ? formatDate(new Date(end)) : ''
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
    const end = searchParams.get(EVENT_SEARCH_FILTERS.END);
    const searchWord = searchParams.get(EVENT_SEARCH_FILTERS.TEXT) || '';
    const start = searchParams.get(EVENT_SEARCH_FILTERS.START);

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
      end: type === 'date' ? null : end ? new Date(end) : null,
      isFree,
      keywordNot: getUrlParamAsArray(
        searchParams,
        EVENT_SEARCH_FILTERS.KEYWORD_NOT
      ),
      keywords:
        type === 'keyword'
          ? keywords.filter(keyword => keyword !== value)
          : keywords,
      onlyChildrenEvents,
      places:
        type === 'place' ? places.filter(place => place !== value) : places,
      publisher: type !== 'publisher' ? publisher : null,
      start: type === 'date' ? null : start ? new Date(start) : null,
      text: type === 'searchWord' ? '' : searchWord,
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const deleteSearchWord = () => {
    handleFilterRemove('', 'searchWord');
  };

  const clearFilters = () => {
    const search = getSearchQuery({
      categories: [],
      dateTypes: [],
      divisions: [],
      end: null,
      isFree: false,
      keywordNot: [],
      keywords: [],
      places: [],
      publisher: null,
      start: null,
      text: '',
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const hasFilters =
    !!publisher ||
    !!categories.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!divisions.length ||
    !!keywords.length ||
    !!places.length ||
    !!searchWord;

  if (!hasFilters) return null;

  return (
    <div className={styles.filterSummary}>
      {!!searchWord && (
        <SearchWordFilter onRemove={deleteSearchWord} searchWord={searchWord} />
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
      <button
        className={styles.clearButton}
        onClick={clearFilters}
        type="button"
      >
        {t('eventSearch.buttonClearFilters')}
      </button>
    </div>
  );
};

export default FilterSummary;
