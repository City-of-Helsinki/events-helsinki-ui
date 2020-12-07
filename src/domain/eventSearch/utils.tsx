import {
  addDays,
  endOfWeek,
  isPast,
  isToday,
  startOfWeek,
  subDays,
} from 'date-fns';
import { IconSpeechbubbleText } from 'hds-react';
import { TFunction } from 'i18next';
import React from 'react';

import { DATE_TYPES } from '../../constants';
import { Meta } from '../../generated/graphql';
import IconCultureAndArts from '../../icons/IconCultureAndArts';
import IconDance from '../../icons/IconDance';
import IconFood from '../../icons/IconFood';
import IconMovies from '../../icons/IconMovies';
import IconMuseum from '../../icons/IconMuseum';
import IconMusic from '../../icons/IconMusic';
import IconSports from '../../icons/IconSports';
import IconTheatre from '../../icons/IconTheatre';
import IconTree from '../../icons/IconTree';
import { Language } from '../../types';
import buildQueryFromObject from '../../util/buildQueryFromObject';
import { formatDate } from '../../util/dateUtils';
import getUrlParamAsArray from '../../util/getUrlParamAsArray';
import {
  CATEGORIES,
  EVENT_SEARCH_FILTERS,
  EVENT_SORT_OPTIONS,
  MAPPED_CATEGORIES,
} from './constants';
import { CategoryOption, Filters, MappedFilters } from './types';

export const getCategoryOptions = (t: TFunction): CategoryOption[] => [
  {
    icon: <IconMovies />,
    text: t('home.category.movie'),
    value: CATEGORIES.MOVIE,
  },
  {
    icon: <IconMusic />,
    text: t('home.category.music'),
    value: CATEGORIES.MUSIC,
  },
  {
    icon: <IconSports />,
    text: t('home.category.sport'),
    value: CATEGORIES.SPORT,
  },
  {
    icon: <IconMuseum />,
    text: t('home.category.museum'),
    value: CATEGORIES.MUSEUM,
  },
  {
    icon: <IconDance />,
    text: t('home.category.dance'),
    value: CATEGORIES.DANCE,
  },
  {
    icon: <IconCultureAndArts />,
    text: t('home.category.culture'),
    value: CATEGORIES.CULTURE,
  },
  {
    icon: <IconTree />,
    text: t('home.category.nature'),
    value: CATEGORIES.NATURE,
  },
  {
    icon: <IconSpeechbubbleText />,
    text: t('home.category.influence'),
    value: CATEGORIES.INFLUENCE,
  },
  {
    icon: <IconTheatre />,
    text: t('home.category.theatre'),
    value: CATEGORIES.THEATRE,
  },
  {
    icon: <IconFood />,
    text: t('home.category.food'),
    value: CATEGORIES.FOOD,
  },
];

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

  if (!start || isToday(new Date(start)) || isPast(new Date(start))) {
    start = 'now';
  }

  if (end && (isToday(new Date(end)) || isPast(new Date(end)))) {
    end = 'today';
  }

  const mappedDivisions: string[] = divisions.length
    ? [...divisions]
    : ['kunta:helsinki'];

  const keywordAnd: string[] = [];

  if (onlyChildrenEvents) {
    keywordAnd.push('yso:p4354');
  }

  const mappedCategories: string[] = categories
    .map((category) => MAPPED_CATEGORIES[category])
    .filter((e) => e);

  // Combine and add keywords

  return {
    combinedText: text,
    division: mappedDivisions.sort(),
    end,
    include,
    isFree: isFree || undefined,
    keyword: [...(keyword ? keyword : []), ...mappedCategories],
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
    alsoOngoingCourses:
      searchParams.get(EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES) === 'true'
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
    alsoOngoingCourses: filters.alsoOngoingCourses ? true : undefined,
    start: formatDate(filters.start, 'yyyy-MM-dd'),
  };

  if (newFilters.end || newFilters.start) {
    delete newFilters.dateTypes;
  }

  return buildQueryFromObject(newFilters);
};
