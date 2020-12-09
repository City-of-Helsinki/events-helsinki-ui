import React from 'react';
import { useLocation } from 'react-router';

import { useCourseListQuery, useEventListQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import {
  DEFAULT_SEARCH_FILTERS,
  EVENT_SORT_OPTIONS,
  PAGE_SIZE,
} from '../eventSearch/constants';
import { getEventSearchVariables, getSearchQuery } from '../eventSearch/utils';
import { SIMILAR_EVENTS_AMOUNT } from './constants';
import { getEventFields } from './EventUtils';
import { EventFields } from './types';

const useSimiliarEventsQueryVariables = (event: EventFields) => {
  const locale = useLocale();
  const { search } = useLocation();
  const { keywords } = getEventFields(event, locale);
  const eventSearch = getSearchQuery({
    ...DEFAULT_SEARCH_FILTERS,
    keyword: keywords.map((keyword) => keyword.id),
  });

  // Filter by search query if exists, if not filter by event keywords
  const searchParams = new URLSearchParams(search || eventSearch);
  return React.useMemo(() => {
    return getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
    });
  }, [locale, searchParams]);
};

export const useSimiliarEventsQuery = (event: EventFields) => {
  const eventFilters = useSimiliarEventsQueryVariables(event);

  const { data: eventsData, loading } = useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });

  // To display only certain amount of events.
  // Always fetch data by using same page size to get events from cache
  const data =
    eventsData?.eventList.data
      // Don't show current event on the list
      .filter((item) => item.id !== event.id)
      .slice(0, SIMILAR_EVENTS_AMOUNT) || [];

  return { data, loading };
};

export const useSimiliarCoursesQuery = (event: EventFields) => {
  const eventFilters = useSimiliarEventsQueryVariables(event);

  const { data: eventsData, loading } = useCourseListQuery({
    ssr: false,
    variables: eventFilters,
  });

  // To display only certain amount of events.
  // Always fetch data by using same page size to get events from cache
  const data =
    eventsData?.courseList.data
      // Don't show current event on the list
      .filter((item) => item.id !== event.id)
      .slice(0, SIMILAR_EVENTS_AMOUNT) || [];

  return { data, loading };
};
