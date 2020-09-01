import { addDays, endOfWeek, isPast, startOfWeek, subDays } from 'date-fns';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';

import { CATEGORIES, DATE_TYPES } from '../../constants';
import { EventListQuery } from '../../generated/graphql';
import { Language } from '../../types';
import { formatDate } from '../../util/dateUtils';
import getUrlParamAsArray from '../../util/getUrlParamAsArray';
import {
  CULTURE_KEYWORDS,
  EVENT_SEARCH_FILTERS,
  EVENT_SORT_OPTIONS,
  INFLUENCE_KEYWORDS,
  MUSEUM_KEYWORDS,
} from './constants';
import { Filters, MappedFilters } from './types';

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

  if (dateTypes.includes(DATE_TYPES.ALL)) {
    return { end: null, start: null };
  }

  if (dateTypes.includes(DATE_TYPES.TODAY)) {
    end = formatDate(today, dateFormat);
    start = formatDate(today, dateFormat);
  }

  if (dateTypes.includes(DATE_TYPES.TOMORROW)) {
    end = formatDate(addDays(today, 1), dateFormat);
    start = start ? start : formatDate(addDays(today, 1), dateFormat);
  }

  if (dateTypes.includes(DATE_TYPES.WEEKEND)) {
    end =
      end && end > formatDate(sunday, dateFormat)
        ? end
        : formatDate(sunday, dateFormat);
    start = start && start < saturday ? start : saturday;
  }

  if (dateTypes.includes(DATE_TYPES.THIS_WEEK)) {
    end =
      end && end > formatDate(sunday, dateFormat)
        ? end
        : formatDate(sunday, dateFormat);
    start = formatDate(monday, dateFormat);
  }

  return { end, start };
};

/**
 * Get current hour as string to event query
 * @return {string}
 */
export const getCurrentHour = (): string => {
  const dateFormat = 'yyyy-MM-dd';
  const now = new Date();
  return `${formatDate(now, dateFormat)}T${formatDate(now, 'HH')}`;
};

/**
 * Get event list request filters from url parameters
 * @param {object} filterOptions
 * @return {object}
 */
export const getEventSearchVariables = ({
  include,
  language,
  pageSize,
  params,
  sortOrder,
  superEventType,
}: {
  include: string[];
  language: Language;
  pageSize: number;
  params: URLSearchParams;
  sortOrder: EVENT_SORT_OPTIONS;
  superEventType: string[];
}) => {
  const dateFormat = 'yyyy-MM-dd';
  const {
    categories,
    dateTypes,
    divisions,
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    places,
    publisher,
    text,
  } = getSearchFilters(params);

  const startsAfter = onlyEveningEvents ? '16' : undefined;
  let { start, end } = getFilterDates({
    dateTypes,
    endTime: params.get(EVENT_SEARCH_FILTERS.END),
    startTime: params.get(EVENT_SEARCH_FILTERS.START),
  });

  if (!start || isPast(new Date(start))) {
    start = getCurrentHour();
  }

  if (end && isPast(new Date(end))) {
    end = formatDate(new Date(), dateFormat);
  }

  const mappedDivisions: string[] = divisions.length
    ? [...divisions]
    : ['kunta:helsinki'];

  const keywordAnd: string[] = [];

  if (onlyChildrenEvents) {
    keywordAnd.push('yso:p4354');
  }

  const mappedCategories: string[] = categories.map((category) => {
    switch (category) {
      case CATEGORIES.CULTURE:
        return CULTURE_KEYWORDS.join(',');
      case CATEGORIES.DANCE:
        return 'yso:p1278';
      case CATEGORIES.FOOD:
        return 'yso:p3670';
      case CATEGORIES.INFLUENCE:
        return INFLUENCE_KEYWORDS.join(',');
      case CATEGORIES.MISC:
        return 'yso:p2108';
      case CATEGORIES.MOVIE:
        return 'yso:p1235';
      case CATEGORIES.MUSEUM:
        return MUSEUM_KEYWORDS.join(',');
      case CATEGORIES.MUSIC:
        return 'yso:p1808';
      case CATEGORIES.NATURE:
        return 'yso:p2771';
      case CATEGORIES.SPORT:
        return 'yso:p965';
      case CATEGORIES.THEATRE:
        return 'yso:p2625';
      default:
        return '';
    }
  });

  // Combine and add keywords

  return {
    combinedText: text,
    division: mappedDivisions.sort(),
    end,
    include,
    isFree: isFree || undefined,
    keyword: [...keyword, ...mappedCategories],
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
  };
};

/**
 * Get next page number from linkedevents api response
 * @param eventsData
 * @return {number}
 */
export const getNextPage = (
  eventsData: EventListQuery | undefined
): number | null => {
  if (!eventsData || !eventsData.eventList.meta.next) return null;

  const urlParts = eventsData.eventList.meta.next.split('?');
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
    isFree:
      searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true' ? true : false,
    keyword: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.KEYWORD),
    keywordNot: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.KEYWORD_NOT
    ),
    onlyChildrenEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS) === 'true'
        ? true
        : false,
    onlyEveningEvents:
      searchParams.get(EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS) === 'true'
        ? true
        : false,
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    publisher: searchParams.get(EVENT_SEARCH_FILTERS.PUBLISHER),
    start,
    text: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.TEXT),
  };
};

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    end: formatDate(filters.end, 'yyyy-MM-dd'),
    isFree: filters.isFree ? true : undefined,
    onlyChildrenEvents: filters.onlyChildrenEvents ? true : undefined,
    onlyEveningEvents: filters.onlyEveningEvents ? true : undefined,
    start: formatDate(filters.start, 'yyyy-MM-dd'),
  };

  if (newFilters.end || newFilters.start) {
    delete newFilters.dateTypes;
  }
  const query: string[] = [];

  forEach(newFilters, (filter, key) => {
    if (!isEmpty(filter) || isNumber(filter) || typeof filter === 'boolean') {
      if (isArray(filter)) {
        const items: Array<string | number> = [];

        forEach(filter, (item: string | number) => {
          items.push(encodeURIComponent(item));
        });

        query.push(`${key}=${items.join(',')}`);
      } else if (!isNil(filter)) {
        query.push(`${key}=${encodeURIComponent(filter)}`);
      }
    }
  });

  return query.length ? `?${query.join('&')}` : '';
};
