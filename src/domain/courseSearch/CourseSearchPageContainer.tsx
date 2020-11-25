import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { useCourseListQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { EventType } from '../event/eventCard/types';
import EventList from '../eventList/EventList';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from '../eventSearch/constants';
import SearchResultsContainer from '../eventSearch/searchResultList/SearchResultsContainer';
import { getEventSearchVariables } from '../eventSearch/utils';
import styles from './courseSearchPageContainer.module.scss';
import CourseSearch from './Search';
import { getNextPage } from './utils';

const CourseSearchPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const eventFilters = React.useMemo(() => {
    return getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
    });
  }, [locale, searchParams]);

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
    <PageWrapper
      title="courseSearch.title"
      className={styles.courseSearchPageContainer}
    >
      <CourseSearch />
      <div id="resultList">
        <LoadingSpinner isLoading={!isFetchingMore && loading}>
          {coursesData && (
            <MainContent offset={-70}>
              <SearchResultsContainer
                count={coursesData.courseList.meta.count}
                loading={loading}
                listComponent={
                  <EventList
                    cardSize="large"
                    eventType={EventType.COURSE}
                    events={coursesData.courseList.data}
                    count={coursesData.courseList.meta.count}
                    loading={loading}
                    hasNext={!!coursesData.courseList.meta.next}
                    onLoadMore={handleLoadMore}
                  />
                }
              />
            </MainContent>
          )}
        </LoadingSpinner>
      </div>
    </PageWrapper>
  );
};

export default CourseSearchPageContainer;
