import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

import { useCourseListQuery } from '../../generated/graphql';
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

  const eventFilters = getEventSearchVariables({
    include: ['keywords', 'location'],
    language: locale,
    pageSize: PAGE_SIZE,
    params: searchParams,
    // TODO: EventSearchPageContainer uses a place here
    sortOrder: EVENT_SORT_OPTIONS.END_TIME,
    superEventType: ['umbrella', 'none'],
    searchSource: EVENT_SEARCH_SOURCES.COURSES,
  });

  const { data: coursesData, fetchMore, loading } = useCourseListQuery({
    notifyOnNetworkStatusChange: true,
    ssr: false,
    variables: eventFilters,
  });

  const handleLoadMore = async () => {
    const page = coursesData?.courseList.meta
      ? getNextPage(coursesData.courseList.meta)
      : null;

    setIsFetchingMore(true);

    if (page) {
      try {
        await fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            const events = [
              ...prev.courseList.data,
              ...fetchMoreResult.courseList.data,
            ];
            fetchMoreResult.courseList.data = events;
            return fetchMoreResult;
          },
          variables: {
            ...eventFilters,
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
      eventsList={coursesData?.courseList}
      handleLoadMore={handleLoadMore}
      isFetchingMoreEvents={isFetchingMore}
      isLoadingEvents={loading}
      pageTitle="courseSearch.title"
      eventType="course"
    />
  );
};

export default CourseSearchPageContainer;
