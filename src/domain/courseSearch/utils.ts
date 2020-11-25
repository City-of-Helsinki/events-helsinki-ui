import { forEach, isArray, isEmpty, isNil, isNumber } from 'lodash';

import { Meta } from '../../generated/graphql';
import { formatDate } from '../../util/dateUtils';
import getUrlParamAsArray from '../../util/getUrlParamAsArray';
import { EVENT_SEARCH_FILTERS } from '../eventSearch/constants';
import { Filters, MappedFilters } from './types';

export const getSearchFilters = (searchParams: URLSearchParams) => {
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
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    text: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.TEXT),
    start,
    end,
    alsoOngoingCourses:
      searchParams.get(EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES) === 'true'
        ? true
        : false,
  };
};

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    start: formatDate(filters.start, 'yyyy-MM-dd'),
    end: formatDate(filters.end, 'yyyy-MM-dd'),
    alsoOngoingCourses: filters.alsoOngoingCourses ? true : undefined,
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

export const getNextPage = (meta: Meta): number | null => {
  if (!meta.next) return null;

  const urlParts = meta.next.split('?');
  const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
  const page = searchParams.get(EVENT_SEARCH_FILTERS.PAGE);
  return page ? Number(page) : null;
};
