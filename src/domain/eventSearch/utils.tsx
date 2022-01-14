import {
  addDays,
  endOfWeek,
  isPast,
  isToday,
  startOfWeek,
  subDays,
} from 'date-fns';
import { TFunction } from 'i18next';
import isEmpty from 'lodash/isEmpty';
import { matchPath } from 'react-router';

import {
  EventTypeId,
  Meta,
  QueryEventListArgs,
} from '../../../src/generated/graphql';
import { FilterType } from '../../common/components/filterButton/types';
import { DATE_TYPES } from '../../constants';
import { Language } from '../../types';
import buildQueryFromObject from '../../util/buildQueryFromObject';
import { formatDate } from '../../util/dateUtils';
import getUrlParamAsArray from '../../util/getUrlParamAsArray';
import { ROUTES } from '../app/routes/constants';
import { EVENT_TYPE_TO_ID, EventType } from '../event/types';
import {
  CATEGORY_CATALOG,
  EVENT_CATEGORIES,
  EVENT_SEARCH_FILTERS,
  EVENT_SORT_OPTIONS,
  eventCategories,
  MAPPED_CATEGORIES,
  MAPPED_KEYWORD_TERMS,
  MAPPED_PLACES,
} from './constants';
import {
  CategoryExtendedOption,
  Filters,
  MappedFilters,
  SearchCategoryOption,
  SearchCategoryType,
} from './types';

export const MIN_AGE = 0;
export const MAX_AGE = 99;

export const sortExtendedCategoryOptions = (
  a: CategoryExtendedOption,
  b: CategoryExtendedOption
) => (a.text > b.text ? 1 : b.text > a.text ? -1 : 0);

export const getCategoryOptions = (
  category: SearchCategoryType,
  categoryOption: SearchCategoryOption,
  t: TFunction
): CategoryExtendedOption => {
  const { icon, labelKey } = categoryOption;
  return {
    icon,
    text: t(labelKey),
    value: category,
  };
};

export const getEventCategoryOptions = (
  t: TFunction,
  categories: EVENT_CATEGORIES[] = CATEGORY_CATALOG[EventTypeId.General].default
): CategoryExtendedOption[] =>
  categories
    .map((category) =>
      getCategoryOptions(category, eventCategories[category], t)
    )
    .sort(sortExtendedCategoryOptions);

/**
 * Get start and end dates to event list filtering
 * @param dayTypes
 * @param startTime
 * @param endTime
 * @return {object}
 */
const getFilterDates = ({
  dateTypes,
  startTime,
  endTime,
}: {
  dateTypes: string[];
  startTime: string | null;
  endTime: string | null;
}) => {
  const dateFormat = 'yyyy-MM-dd';

  if (startTime || endTime) {
    return { end: endTime, start: startTime };
  }

  const today = new Date();
  const sunday = endOfWeek(today, { weekStartsOn: 1 });
  const saturday = formatDate(subDays(sunday, 1), dateFormat);
  const monday = startOfWeek(today, { weekStartsOn: 1 });

  let end = '';
  let start = '';

  if (dateTypes.includes(DATE_TYPES.TODAY)) {
    end = formatDate(today, dateFormat);
    start = formatDate(today, dateFormat);
  }

  if (dateTypes.includes(DATE_TYPES.TOMORROW)) {
    end = formatDate(addDays(today, 1), dateFormat);
    start = start ? start : formatDate(addDays(today, 1), dateFormat);
  }

  if (dateTypes.includes(DATE_TYPES.WEEKEND)) {
    end = formatDate(sunday, dateFormat);
    start = start && start < saturday ? start : saturday;
  }

  if (dateTypes.includes(DATE_TYPES.THIS_WEEK)) {
    end = formatDate(sunday, dateFormat);
    start = formatDate(monday, dateFormat);
  }

  return { end, start };
};

/**
 * Get event list request filters from url parameters
 * @param {object} filterOptions
 * @return {object}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEventSearchVariables = ({
  include,
  language,
  pageSize,
  params,
  sortOrder,
  superEventType,
  place,
  eventType = 'event',
}: {
  include: string[];
  language: Language;
  pageSize: number;
  params: URLSearchParams;
  sortOrder: EVENT_SORT_OPTIONS;
  superEventType: string[];
  place?: string;
  eventType: EventType;
}): QueryEventListArgs => {
  const {
    categories,
    dateTypes,
    divisions,
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    onlyRemoteEvents,
    places,
    publisher,
    text,
    suitableFor,
  } = getSearchFilters(params);
  const pathPlace = place && MAPPED_PLACES[place.toLowerCase()];

  if (pathPlace) {
    places.push(pathPlace);
  }
  const startsAfter = onlyEveningEvents ? '16' : undefined;
  let { start, end } = getFilterDates({
    dateTypes,
    endTime: params.get(EVENT_SEARCH_FILTERS.END),
    startTime: params.get(EVENT_SEARCH_FILTERS.START),
  });

  if (!start || isToday(new Date(start)) || isPast(new Date(start))) {
    start = 'now';
  }

  if (end && (isToday(new Date(end)) || isPast(new Date(end)))) {
    end = 'today';
  }

  const keywordAnd: string[] = [];

  if (onlyChildrenEvents) {
    keywordAnd.push('yso:p4354');
  }

  const categoriesParamName = MAPPED_KEYWORD_TERMS[eventType];
  const categoryMap = MAPPED_CATEGORIES[eventType];

  const getMappedPropertyValues = (
    list: string[],
    map: Record<string, string[]>
  ) =>
    list?.reduce<string[]>(
      (prev, val: string) => prev.concat(map[val] ?? []),
      []
    );

  const mappedCategories = getMappedPropertyValues(categories, categoryMap);

  const hasLocation = !isEmpty(divisions) || !isEmpty(places);

  const getSearchParam = () => {
    const hasText = !isEmpty(text);
    const isEventsSearch = eventType === 'event';
    if (hasText && isEventsSearch && hasLocation) {
      // show helsinki events matching to text
      return { localOngoingAnd: text };
    } else if (hasText) {
      // show internet and helsinki events matching to text
      return { allOngoingAnd: text };
    } else {
      // show all internet and helsinki events
      return { allOngoing: true };
    }
  };
  const divisionParam = hasLocation && { division: divisions.sort() };

  return {
    ...getSearchParam(),
    ...divisionParam,
    end,
    include,
    isFree: isFree || undefined,
    internetBased: onlyRemoteEvents || undefined,
    [categoriesParamName]: [...(keyword ?? []), ...mappedCategories],
    keywordAnd,
    keywordNot,
    language,
    location: places.sort(),
    pageSize,
    publisher,
    sort: sortOrder,
    start,
    startsAfter,
    superEventType,
    suitableFor,
    eventType: [EVENT_TYPE_TO_ID[eventType]],
  };
};

/**
 * Get next page number from linkedevents response meta field
 * @param meta
 * @return {number}
 */
export const getNextPage = (meta: Meta): number | null => {
  if (!meta.next) return null;

  const urlParts = meta.next.split('?');
  const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
  const page = searchParams.get(EVENT_SEARCH_FILTERS.PAGE);
  return page ? Number(page) : null;
};

export const getSearchFilters = (searchParams: URLSearchParams): Filters => {
  const endTime = searchParams.get(EVENT_SEARCH_FILTERS.END);
  const end = endTime ? new Date(endTime) : null;

  const startTime = searchParams.get(EVENT_SEARCH_FILTERS.START);
  const start = startTime ? new Date(startTime) : null;

  return {
    categories: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.CATEGORIES
    ),
    dateTypes: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.DATE_TYPES
    ),
    divisions: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.DIVISIONS),
    end,
    isFree: searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true',
    keyword: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.KEYWORD),
    keywordNot: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORD_NOT
    ),
    onlyChildrenEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS) === 'true',
    onlyEveningEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS) === 'true',
    onlyRemoteEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS) === 'true',
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    publisher: searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER),
    start,
    text: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.TEXT),
    suitableFor: normalizeSuitableFor(
      getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.SUITABLE, false)
    ),
  };
};

export const normalizeSuitableFor = (values: (number | string)[]): number[] => {
  if (!values?.length) return [];

  const [minAge, maxAge] = values.map((value) => {
    const parsed = parseInt(value.toString());
    return isNaN(parsed) ? null : parsed;
  });

  // If no range is given, return an empty list.
  if (minAge == null && maxAge == null) {
    return [];
  }

  // Sort should be done last, so the right number is full filled with a default.
  return [minAge ?? MIN_AGE, maxAge ?? MAX_AGE].sort((a, b) => a - b);
};

export const getSuitableForFilterValue = (
  initValue: number[] | undefined,
  type: FilterType
) => {
  if (['minAge', 'maxAge', 'exactAge'].includes(type)) return undefined;
  return initValue;
};

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    end: formatDate(filters.end, 'yyyy-MM-dd'),
    isFree: filters.isFree ? true : undefined,
    onlyChildrenEvents: filters.onlyChildrenEvents ? true : undefined,
    onlyEveningEvents: filters.onlyEveningEvents ? true : undefined,
    onlyRemoteEvents: filters.onlyRemoteEvents ? true : undefined,
    start: formatDate(filters.start, 'yyyy-MM-dd'),
  };

  if (newFilters.end || newFilters.start) {
    delete newFilters.dateTypes;
  }

  return buildQueryFromObject(newFilters);
};

export const getEventTypeFromRouteUrl = (
  url: string,
  locale: Language
): EventType | undefined => {
  let eventType = 'event';
  const routeToEventType = {
    [`/${locale}${ROUTES.EVENTS}`]: 'event',
    [`/${locale}${ROUTES.COURSES}`]: 'course',
  };
  if (!url) {
    return undefined;
  }
  try {
    for (const route in routeToEventType) {
      if (
        matchPath(new URL(url).pathname, {
          path: route,
          exact: true,
          strict: true,
        })
      ) {
        eventType = routeToEventType[route];
        break;
      }
    }
  } catch (e) {
    // Safe fallback for invalid URL.
    return undefined;
  }

  return eventType as EventType;
};
