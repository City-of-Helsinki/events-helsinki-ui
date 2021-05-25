import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import { EventTypeId, useEventListQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import {
  EVENT_SEARCH_SOURCES,
  EVENT_SORT_OPTIONS,
  PAGE_SIZE,
} from '../eventSearch/constants';
import SearchPage from '../eventSearch/SearchPage';
import { getEventSearchVariables, getNextPage } from '../eventSearch/utils';
import CourseSearch from './Search';

const CourseSearchPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const variables = getEventSearchVariables({
    include: ['keywords', 'location'],
    language: locale,
    pageSize: PAGE_SIZE,
    params: searchParams,
    sortOrder: EVENT_SORT_OPTIONS.END_TIME,
    superEventType: ['umbrella', 'none'],
    searchSource: EVENT_SEARCH_SOURCES.COURSES,
    eventType: EventTypeId.Course,
  });

  const { data: coursesData, fetchMore, loading } = useEventListQuery({
    notifyOnNetworkStatusChange: true,
    ssr: false,
    variables,
  });

  const handleLoadMore = async () => {
    const page = coursesData?.eventList.meta
      ? getNextPage(coursesData.eventList.meta)
      : null;

    setIsFetchingMore(true);

    if (page) {
      try {
        await fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            const events = [
              ...prev.eventList.data,
              ...fetchMoreResult.eventList.data,
            ];
            fetchMoreResult.eventList.data = events;
            return fetchMoreResult;
          },
          variables: {
            ...variables,
            page: page,
          },
        });
      } catch (e) {
        toast.error(t('eventSearch.errorLoadMode'));
      }
    }
    setIsFetchingMore(false);
  };

  return (
    <SearchPage
      SearchComponent={CourseSearch}
      pageTitle="courseSearch.title"
      isLoadingEvents={loading}
      handleLoadMore={handleLoadMore}
      isFetchingMoreEvents={isFetchingMore}
      eventsList={coursesData?.eventList}
      eventType="course"
    />
  );
};

export default CourseSearchPageContainer;
