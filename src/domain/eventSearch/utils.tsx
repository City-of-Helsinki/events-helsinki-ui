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
import { matchPath } from 'react-router';

import { Meta, QueryEventListArgs } from '../../../src/generated/graphql';
import { DATE_TYPES } from '../../constants';
import IconArt from '../../icons/IconArt';
import IconCamp from '../../icons/IconCamp';
import IconCraft from '../../icons/IconCraft';
import IconCultureAndArts from '../../icons/IconCultureAndArts';
import IconDance from '../../icons/IconDance';
import IconFood from '../../icons/IconFood';
import IconGames from '../../icons/IconGames';
import IconLanguages from '../../icons/IconLanguages';
import IconLiterature from '../../icons/IconLiterature';
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
import { ROUTES } from '../app/routes/constants';
import { EVENT_TYPE_TO_ID, EventType } from '../event/types';
import {
  COURSE_CATEGORIES,
  COURSE_HOBBY_TYPES,
  EVENT_CATEGORIES,
  EVENT_SEARCH_FILTERS,
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
  SearchCategory,
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

export const getCourseCategoryOptions = (t: TFunction): CategoryOption[] => [
  {
    icon: <IconMovies />,
    text: t('home.category.courses.movieAndMedia'),
    value: COURSE_CATEGORIES.MOVIE,
    secondary: true,
  },
  {
    icon: <IconLanguages />,
    text: t('home.category.courses.languages'),
    value: COURSE_CATEGORIES.LANGUAGES,
    secondary: true,
  },
  {
    icon: <IconLiterature />,
    text: t('home.category.courses.literature'),
    value: COURSE_CATEGORIES.LITERATURE,
  },
  {
    icon: <IconArt />,
    text: t('home.category.courses.artsAndCulture'),
    value: COURSE_CATEGORIES.ARTS_AND_CULTURE,
    secondary: true,
  },
  {
    icon: <IconArt />,
    text: t('home.category.courses.visualArts'),
    value: COURSE_CATEGORIES.VISUAL_ARTS,
  },
  {
    icon: <IconCraft />,
    text: t('home.category.courses.handicrafts'),
    value: COURSE_CATEGORIES.HANDICRAFTS,
  },
  {
    icon: <IconSports />,
    text: t('home.category.courses.sport'),
    value: COURSE_CATEGORIES.SPORT,
  },
  {
    icon: <IconMusic />,
    text: t('home.category.courses.music'),
    value: COURSE_CATEGORIES.MUSIC,
  },
  {
    icon: <IconGames />,
    text: t('home.category.courses.games'),
    value: COURSE_CATEGORIES.GAMES,
  },
  {
    icon: <IconFood />,
    text: t('home.category.courses.food'),
    value: COURSE_CATEGORIES.FOOD,
    secondary: true,
  },
  {
    icon: <IconDance />,
    text: t('home.category.courses.dance'),
    value: COURSE_CATEGORIES.DANCE,
  },
  {
    icon: <IconTheatre />,
    text: t('home.category.courses.theatre'),
    value: COURSE_CATEGORIES.THEATRE,
  },
];

/**
 * Get a list of course hobby type button options.
 * Secondary options are not shown in landing page.
 */
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
    secondary: true,
  },
  {
    icon: <IconCamp />,
    text: t('home.hobby.camps'),
    value: COURSE_HOBBY_TYPES.CAMPS,
  },
  {
    icon: <IconMovies />,
    text: t('home.hobby.trips'),
    value: COURSE_HOBBY_TYPES.TRIPS,
    secondary: true,
  },
  {
    icon: <IconMovies />,
    text: t('home.hobby.workshops'),
    value: COURSE_HOBBY_TYPES.WORKSHOPS,
    secondary: true,
  },
];

export const eventCategories: SearchCategory = {
  [EVENT_CATEGORIES.MOVIE]: {
    icon: <IconMovies />,
    transKey: 'home.category.movie',
  },
  [EVENT_CATEGORIES.MUSIC]: {
    icon: <IconMusic />,
    transKey: 'home.category.music',
  },
  [EVENT_CATEGORIES.SPORT]: {
    icon: <IconSports />,
    transKey: 'home.category.sport',
  },
  [EVENT_CATEGORIES.MUSEUM]: {
    icon: <IconMuseum />,
    transKey: 'home.category.museum',
  },
  [EVENT_CATEGORIES.DANCE]: {
    icon: <IconDance />,
    transKey: 'home.category.dance',
  },
  [EVENT_CATEGORIES.CULTURE]: {
    icon: <IconCultureAndArts />,
    transKey: 'home.category.culture',
  },
  [EVENT_CATEGORIES.NATURE]: {
    icon: <IconTree />,
    transKey: 'home.category.nature',
  },
  [EVENT_CATEGORIES.INFLUENCE]: {
    icon: <IconSpeechbubbleText aria-hidden />,
    transKey: 'home.category.influence',
  },
  [EVENT_CATEGORIES.THEATRE]: {
    icon: <IconTheatre />,
    transKey: 'home.category.theatre',
  },
  [EVENT_CATEGORIES.FOOD]: {
    icon: <IconFood />,
    transKey: 'home.category.food',
  },
};

export const courseCategories: SearchCategory = {
  [COURSE_CATEGORIES.MOVIE]: {
    icon: <IconMovies />,
    transKey: 'home.category.courses.movieAndMedia',
  },
  [COURSE_CATEGORIES.LANGUAGES]: {
    icon: <IconLanguages />,
    transKey: 'home.category.courses.languages',
  },
  [COURSE_CATEGORIES.LITERATURE]: {
    icon: <IconLiterature />,
    transKey: 'home.category.courses.literature',
  },
  [COURSE_CATEGORIES.ARTS_AND_CULTURE]: {
    icon: <IconArt />,
    transKey: 'home.category.courses.artsAndCulture',
  },
  [COURSE_CATEGORIES.VISUAL_ARTS]: {
    icon: <IconArt />,
    transKey: 'home.category.courses.visualArts',
  },
  [COURSE_CATEGORIES.HANDICRAFTS]: {
    icon: <IconCraft />,
    transKey: 'home.category.courses.handicrafts',
  },
  [COURSE_CATEGORIES.SPORT]: {
    icon: <IconSports />,
    transKey: 'home.category.courses.sport',
  },
  [COURSE_CATEGORIES.MUSIC]: {
    icon: <IconMusic />,
    transKey: 'home.category.courses.music',
  },
  [COURSE_CATEGORIES.GAMES]: {
    icon: <IconGames />,
    transKey: 'home.category.courses.games',
  },
  [COURSE_CATEGORIES.FOOD]: {
    icon: <IconFood />,
    transKey: 'home.category.courses.food',
  },
  [COURSE_CATEGORIES.DANCE]: {
    icon: <IconDance />,
    transKey: 'home.category.courses.dance',
  },
  [COURSE_CATEGORIES.THEATRE]: {
    icon: <IconTheatre />,
    transKey: 'home.category.courses.theatre',
  },
};

export const hobbyTypes: SearchCategory = {
  [COURSE_HOBBY_TYPES.CLUBS]: {
    icon: <IconMovies />,
    transKey: 'home.hobby.clubs',
  },
  [COURSE_HOBBY_TYPES.COURSES]: {
    icon: <IconMovies />,
    transKey: 'home.hobby.courses',
  },
  [COURSE_HOBBY_TYPES.CAMPS]: {
    icon: <IconCamp />,
    transKey: 'home.hobby.camps',
  },
  [COURSE_HOBBY_TYPES.TRIPS]: {
    icon: <IconMovies />,
    transKey: 'home.hobby.trips',
  },
  [COURSE_HOBBY_TYPES.WORKSHOPS]: {
    icon: <IconMovies />,
    transKey: 'home.hobby.workshops',
  },
};

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
    hobbyTypes,
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
  const mappedHobbyTypes = getMappedPropertyValues(
    hobbyTypes ?? [],
    MAPPED_COURSE_HOBBY_TYPES
  );

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
    keywordOrSet3: mappedHobbyTypes,
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
    alsoOngoingCourses:
      searchParams.get(EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES) === 'true',
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
