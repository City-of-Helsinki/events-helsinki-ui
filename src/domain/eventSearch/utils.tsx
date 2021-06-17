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
  SearchCategoryOption,
} from './types';

export const sortExtendedCategoryOptions = (
  a: CategoryOption | HobbyTypeOption,
  b: CategoryOption | HobbyTypeOption
) => (a.text > b.text ? 1 : b.text > a.text ? -1 : 0);

export const getEventCategoryOptions = (
  t: TFunction,
  categories = [
    EVENT_CATEGORIES.MOVIE,
    EVENT_CATEGORIES.MUSIC,
    EVENT_CATEGORIES.SPORT,
    EVENT_CATEGORIES.MUSEUM,
    EVENT_CATEGORIES.DANCE,
    EVENT_CATEGORIES.CULTURE,
    EVENT_CATEGORIES.NATURE,
    EVENT_CATEGORIES.INFLUENCE,
    EVENT_CATEGORIES.THEATRE,
    EVENT_CATEGORIES.FOOD,
  ]
): CategoryOption[] =>
  categories
    .map((category) => {
      const { icon, labelKey } = eventCategories[category];
      return {
        icon,
        text: t(labelKey),
        value: category,
      } as CategoryOption;
    })
    .sort(sortExtendedCategoryOptions);

export const getCourseCategoryOptions = (
  t: TFunction,
  categories = [
    COURSE_CATEGORIES.MOVIE,
    COURSE_CATEGORIES.LANGUAGES,
    COURSE_CATEGORIES.LITERATURE,
    COURSE_CATEGORIES.ARTS_AND_CULTURE,
    COURSE_CATEGORIES.VISUAL_ARTS,
    COURSE_CATEGORIES.HANDICRAFTS,
    COURSE_CATEGORIES.SPORT,
    COURSE_CATEGORIES.MUSIC,
    COURSE_CATEGORIES.GAMES,
    COURSE_CATEGORIES.FOOD,
    COURSE_CATEGORIES.DANCE,
    COURSE_CATEGORIES.THEATRE,
  ]
): CategoryOption[] =>
  categories
    .map((category) => {
      const { icon, labelKey } = courseCategories[category];
      return {
        icon,
        text: t(labelKey),
        value: category,
      } as CategoryOption;
    })
    .sort(sortExtendedCategoryOptions);

export const getCourseHobbyTypeOptions = (
  t: TFunction,
  categories = [
    COURSE_HOBBY_TYPES.CLUBS,
    COURSE_HOBBY_TYPES.COURSES,
    COURSE_HOBBY_TYPES.CAMPS,
    COURSE_HOBBY_TYPES.TRIPS,
    COURSE_HOBBY_TYPES.WORKSHOPS,
  ]
): HobbyTypeOption[] =>
  categories
    .map((category) => {
      const { icon, labelKey } = hobbyTypes[category];
      return {
        icon,
        text: t(labelKey),
        value: category,
      } as HobbyTypeOption;
    })
    .sort(sortExtendedCategoryOptions);

export const eventCategories: Record<EVENT_CATEGORIES, SearchCategoryOption> = {
  [EVENT_CATEGORIES.MOVIE]: {
    icon: <IconMovies />,
    labelKey: 'home.category.movie',
  },
  [EVENT_CATEGORIES.MUSIC]: {
    icon: <IconMusic />,
    labelKey: 'home.category.music',
  },
  [EVENT_CATEGORIES.SPORT]: {
    icon: <IconSports />,
    labelKey: 'home.category.sport',
  },
  [EVENT_CATEGORIES.MUSEUM]: {
    icon: <IconMuseum />,
    labelKey: 'home.category.museum',
  },
  [EVENT_CATEGORIES.DANCE]: {
    icon: <IconDance />,
    labelKey: 'home.category.dance',
  },
  [EVENT_CATEGORIES.CULTURE]: {
    icon: <IconCultureAndArts />,
    labelKey: 'home.category.culture',
  },
  [EVENT_CATEGORIES.NATURE]: {
    icon: <IconTree />,
    labelKey: 'home.category.nature',
  },
  [EVENT_CATEGORIES.INFLUENCE]: {
    icon: <IconSpeechbubbleText aria-hidden />,
    labelKey: 'home.category.influence',
  },
  [EVENT_CATEGORIES.THEATRE]: {
    icon: <IconTheatre />,
    labelKey: 'home.category.theatre',
  },
  [EVENT_CATEGORIES.FOOD]: {
    icon: <IconFood />,
    labelKey: 'home.category.food',
  },
  [EVENT_CATEGORIES.MISC]: {
    icon: <></>,
    labelKey: 'home.category.misc',
  },
};

export const courseCategories: Record<COURSE_CATEGORIES, SearchCategoryOption> =
  {
    [COURSE_CATEGORIES.MOVIE]: {
      icon: <IconMovies />,
      labelKey: 'home.category.courses.movieAndMedia',
    },
    [COURSE_CATEGORIES.LANGUAGES]: {
      icon: <IconLanguages />,
      labelKey: 'home.category.courses.languages',
    },
    [COURSE_CATEGORIES.LITERATURE]: {
      icon: <IconLiterature />,
      labelKey: 'home.category.courses.literature',
    },
    [COURSE_CATEGORIES.ARTS_AND_CULTURE]: {
      icon: <IconArt />,
      labelKey: 'home.category.courses.artsAndCulture',
    },
    [COURSE_CATEGORIES.VISUAL_ARTS]: {
      icon: <IconArt />,
      labelKey: 'home.category.courses.visualArts',
    },
    [COURSE_CATEGORIES.HANDICRAFTS]: {
      icon: <IconCraft />,
      labelKey: 'home.category.courses.handicrafts',
    },
    [COURSE_CATEGORIES.SPORT]: {
      icon: <IconSports />,
      labelKey: 'home.category.courses.sport',
    },
    [COURSE_CATEGORIES.MUSIC]: {
      icon: <IconMusic />,
      labelKey: 'home.category.courses.music',
    },
    [COURSE_CATEGORIES.GAMES]: {
      icon: <IconGames />,
      labelKey: 'home.category.courses.games',
    },
    [COURSE_CATEGORIES.FOOD]: {
      icon: <IconFood />,
      labelKey: 'home.category.courses.food',
    },
    [COURSE_CATEGORIES.DANCE]: {
      icon: <IconDance />,
      labelKey: 'home.category.courses.dance',
    },
    [COURSE_CATEGORIES.THEATRE]: {
      icon: <IconTheatre />,
      labelKey: 'home.category.courses.theatre',
    },
  };

export const hobbyTypes: Record<COURSE_HOBBY_TYPES, SearchCategoryOption> = {
  [COURSE_HOBBY_TYPES.CLUBS]: {
    icon: <IconMovies />,
    labelKey: 'home.hobby.clubs',
  },
  [COURSE_HOBBY_TYPES.COURSES]: {
    icon: <></>,
    labelKey: 'home.hobby.courses',
  },
  [COURSE_HOBBY_TYPES.CAMPS]: {
    icon: <IconCamp />,
    labelKey: 'home.hobby.camps',
  },
  [COURSE_HOBBY_TYPES.TRIPS]: {
    icon: <></>,
    labelKey: 'home.hobby.trips',
  },
  [COURSE_HOBBY_TYPES.WORKSHOPS]: {
    icon: <></>,
    labelKey: 'home.hobby.workshops',
  },
  [COURSE_HOBBY_TYPES.ONLINE_STUDIES]: {
    icon: <></>,
    labelKey: 'home.hobby.onlineStudies',
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
