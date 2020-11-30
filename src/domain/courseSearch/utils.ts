import { Meta } from '../../generated/graphql';
import buildQueryFromObject from '../../util/buildQueryFromObject';
import { formatDate } from '../../util/dateUtils';
import getUrlParamAsArray from '../../util/getUrlParamAsArray';
import { EVENT_SEARCH_FILTERS } from '../eventSearch/constants';
import { Filters, MappedFilters } from './types';

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
    places: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.PLACES),
    text: getUrlParamAsArray(searchParams, EVENT_SEARCH_FILTERS.TEXT),
    start,
    end,
    isFree:
      searchParams.get(EVENT_SEARCH_FILTERS.IS_FREE) === 'true' ? true : false,
    onlyOngoingCourses:
      searchParams.get(EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES) === 'true'
        ? true
        : false,
  };
};

export const getNextPage = (meta: Meta): number | null => {
  if (!meta.next) return null;

  const urlParts = meta.next.split('?');
  const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
  const page = searchParams.get(EVENT_SEARCH_FILTERS.PAGE);
  return page ? Number(page) : null;
};

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    isFree: filters.isFree ? true : undefined,
    start: formatDate(filters.start, 'yyyy-MM-dd'),
    end: formatDate(filters.end, 'yyyy-MM-dd'),
    onlyOngoingCourses: filters.onlyOngoingCourses ? true : undefined,
  };

  if (newFilters.end || newFilters.start) {
    delete newFilters.dateTypes;
  }

  return buildQueryFromObject(newFilters);
};
