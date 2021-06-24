import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import FilterButton, {
  FilterType,
} from '../../../common/components/filterButton/FilterButton';
import useDivisionOptions from '../../../hooks/useDivisionOptions';
import useLocale from '../../../hooks/useLocale';
import { formatDate } from '../../../util/dateUtils';
import { translateValue } from '../../../util/translateUtils';
import { ROUTES } from '../../app/routes/constants';
import {
  getSearchFilters,
  getSearchQuery,
  removeSuitableForFilterValue,
} from '../utils';
import AgeFilter from './AgeFilter';
import DateFilter from './DateFilter';
import styles from './filterSummary.module.scss';
import PlaceFilter from './PlaceFilter';
import PublisherFilter from './PublisherFilter';
import TextFilter from './TextFilter';

export const filterSummaryContainerTestId = 'filter-summary';

interface Props {
  onClear: () => void;
  route?: '/events' | '/courses';
}

const FilterSummary: React.FC<Props> = ({ onClear, route }) => {
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
    keyword,
    keywordNot,
    onlyChildrenEvents,
    places,
    publisher,
    start,
    text,
    suitableFor,
    hobbyTypes,
  } = getSearchFilters(searchParams);

  const [minAge, maxAge] = suitableFor ?? [];

  const dateText =
    start || end
      ? `${start ? formatDate(start) : ''} - ${
          end ? formatDate(end) : ''
        }`.trim()
      : '';

  const neighborhoods = useDivisionOptions();
  const getNeighorhoodName = React.useCallback(
    (id: string) => {
      const neighborhood = neighborhoods.find((item) => item.value === id);
      return neighborhood?.text ?? '';
    },
    [neighborhoods]
  );

  const handleFilterRemove = (value: string | number, type: FilterType) => {
    const getFilteredList = (listType: FilterType, list: string[] = []) =>
      type === listType ? list.filter((v) => v !== value) : list;

    const search = getSearchQuery({
      categories: getFilteredList('category', categories),
      hobbyTypes: getFilteredList('hobbyType', hobbyTypes),
      dateTypes: getFilteredList('dateType', dateTypes),
      divisions: getFilteredList('division', divisions),
      end: type === 'date' ? null : end,
      isFree,
      keyword,
      keywordNot,
      onlyChildrenEvents,
      places: getFilteredList('place', places),
      publisher: type !== 'publisher' ? publisher : null,
      start: type === 'date' ? null : start,
      text: getFilteredList('text', text),
      suitableFor: removeSuitableForFilterValue(suitableFor, type),
    });

    push({ pathname: `/${locale}${route || ROUTES.EVENTS}`, search });
  };

  const hasFilters =
    !!publisher ||
    !!categories.length ||
    !!hobbyTypes?.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!divisions.length ||
    !!places.length ||
    !!text.length ||
    !!suitableFor?.length;

  if (!hasFilters) return null;

  return (
    <div
      className={styles.filterSummary}
      data-testid={filterSummaryContainerTestId}
    >
      {text.map((item, index) => (
        <TextFilter key={index} text={item} onRemove={handleFilterRemove} />
      ))}
      {categories.map((category) => (
        <FilterButton
          key={category}
          onRemove={handleFilterRemove}
          text={translateValue(
            `home.category.${route === '/courses' ? 'courses.' : ''}`,
            category,
            t
          )}
          type="category"
          value={category}
        />
      ))}
      {hobbyTypes?.map((hobbyType) => (
        <FilterButton
          key={hobbyType}
          onRemove={handleFilterRemove}
          text={translateValue('home.hobby.', hobbyType, t)}
          type="hobbyType"
          value={hobbyType}
        />
      ))}
      {publisher && (
        <PublisherFilter id={publisher} onRemove={handleFilterRemove} />
      )}
      {divisions.map((division) => (
        <FilterButton
          key={division}
          onRemove={handleFilterRemove}
          text={getNeighorhoodName(division)}
          type="division"
          value={division}
        />
      ))}
      {places.map((place) => (
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
      {dateTypes.map((dateType) => (
        <DateFilter
          key={dateType}
          onRemove={handleFilterRemove}
          type="dateType"
          value={dateType}
        />
      ))}
      {minAge != null && (
        <AgeFilter
          type="minAge"
          value={minAge?.toString()}
          onRemove={handleFilterRemove}
        />
      )}
      {maxAge != null && (
        <AgeFilter
          type="maxAge"
          value={maxAge?.toString()}
          onRemove={handleFilterRemove}
        />
      )}
      <button className={styles.clearButton} onClick={onClear} type="button">
        {t('eventSearch.buttonClearFilters')}
      </button>
    </div>
  );
};

export default FilterSummary;
