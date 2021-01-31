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
import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { DATE_TYPES } from '../../constants';
import { Meta, QueryEventListArgs } from '../../generated/graphql';
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
  COURSE_CATEGORIES,
  COURSE_HOBBY_TYPES,
  EVENT_CATEGORIES,
  EVENT_SEARCH_FILTERS,
  EVENT_SEARCH_SOURCES,
  EVENT_SORT_OPTIONS,
  MAPPED_CATEGORIES,
  MAPPED_COURSE_HOBBY_TYPES,
  MAPPED_KEYWORD_TERMS,
  MAPPED_PLACES,
} from './constants';
import {
  CategoryOption,
  Filters,
  HobbyTypeOption,
  MappedFilters,
} from './types';

export const getEventCategoryOptions = (t: TFunction): CategoryOption[] => [
  {
    icon: <IconMovies />,
    text: t('home.category.movie'),
    value: EVENT_CATEGORIES.MOVIE,
  },
  {
    icon: <IconMusic />,
    text: t('home.category.music'),
    value: EVENT_CATEGORIES.MUSIC,
  },
  {
    icon: <IconSports />,
    text: t('home.category.sport'),
    value: EVENT_CATEGORIES.SPORT,
  },
  {
    icon: <IconMuseum />,
    text: t('home.category.museum'),
    value: EVENT_CATEGORIES.MUSEUM,
  },
  {
    icon: <IconDance />,
    text: t('home.category.dance'),
    value: EVENT_CATEGORIES.DANCE,
  },
  {
    icon: <IconCultureAndArts />,
    text: t('home.category.culture'),
    value: EVENT_CATEGORIES.CULTURE,
  },
  {
    icon: <IconTree />,
    text: t('home.category.nature'),
    value: EVENT_CATEGORIES.NATURE,
  },
  {
    icon: <IconSpeechbubbleText aria-hidden />,
    text: t('home.category.influence'),
    value: EVENT_CATEGORIES.INFLUENCE,
  },
  {
    icon: <IconTheatre />,
    text: t('home.category.theatre'),
    value: EVENT_CATEGORIES.THEATRE,
  },
  {
    icon: <IconFood />,
    text: t('home.category.food'),
    value: EVENT_CATEGORIES.FOOD,
  },
];

// todo: fix icons and list of options when defined
export const getCourseCategoryOptions = (t: TFunction): CategoryOption[] => [
  {
    icon: <IconMovies />,
    text: t('home.category.movie'),
    value: COURSE_CATEGORIES.MOVIE,
  },
];

// todo: fix icons and list of options when defined
export const getCourseHobbyTypeOptions = (t: TFunction): HobbyTypeOption[] => [
  {
    icon: <IconMovies />,
    text: t('home.hobby.clubs'),
    value: COURSE_HOBBY_TYPES.CLUBS,
  },
  {
    icon: <IconMovies />,
    text: t('home.hobby.courses'),
    value: COURSE_HOBBY_TYPES.COURSES,
  },
  {
    icon: <IconMovies />,
    text: t('home.hobby.camps'),
    value: COURSE_HOBBY_TYPES.CAMPS,
  },
  {
    icon: <IconMovies />,
    text: t('home.hobby.trips'),
    value: COURSE_HOBBY_TYPES.TRIPS,
  },
  {
    icon: <IconMovies />,
    text: t('home.hobby.workshops'),
    value: COURSE_HOBBY_TYPES.WORKSHOPS,
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
  searchSource = EVENT_SEARCH_SOURCES.EVENTS,
}: {
  include: string[];
  language: Language;
  pageSize: number;
  params: URLSearchParams;
  sortOrder: EVENT_SORT_OPTIONS;
  superEventType: string[];
  place?: string;
  searchSource?: EVENT_SEARCH_SOURCES;
}): QueryEventListArgs => {
  const {
    categories,
    hobbyTypes,
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
    audienceMinAgeGt,
    audienceMaxAgeLt,
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

  const keywordsParamName = MAPPED_KEYWORD_TERMS[searchSource];
  let mappedCategories: string[] = [];
  categories.map(
    (category) =>
      (mappedCategories = mappedCategories
        .concat(MAPPED_CATEGORIES[searchSource][category]?.split(','))
        .filter((e) => e))
  );
  let mappedHobbyTypes: string[] = [];
  hobbyTypes?.map(
    (hobbyType) =>
      (mappedHobbyTypes = mappedHobbyTypes
        .concat(MAPPED_COURSE_HOBBY_TYPES[hobbyType]?.split(','))
        .filter((e) => e))
  );
  const hasLocation = !isEmpty(divisions) || !isEmpty(places);
  const hasText = !isEmpty(text);
  // Combine and add keywords

  return {
    ...(hasText &&
      (hasLocation ? { localOngoingAnd: text } : { allOngoingAnd: text })),
    ...(hasLocation && { division: divisions.sort() }),
    end,
    include,
    isFree: isFree || undefined,
    [keywordsParamName]: [...(keyword ? keyword : []), ...mappedCategories],
    keywordOrSet3: [...mappedHobbyTypes],
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
    audienceMinAgeGt,
    audienceMaxAgeLt,
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
    hobbyTypes: getUrlParamAsArray(
      searchParams,
      EVENT_SEARCH_FILTERS.HOBBY_TYPES
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
    audienceMinAgeGt: searchParams.get(EVENT_SEARCH_FILTERS.MIN_AGE) || '',
    audienceMaxAgeLt: searchParams.get(EVENT_SEARCH_FILTERS.MAX_AGE) || '',
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
