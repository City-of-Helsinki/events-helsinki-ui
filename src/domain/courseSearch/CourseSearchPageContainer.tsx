import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { useCourseListQuery } from '../../generated/graphql';
import useIsSmallScreen from '../../hooks/useIsSmallScreen';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { getLargeEventCardId } from '../event/EventUtils';
import { EventType } from '../event/types';
import EventList from '../eventList/EventList';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from '../eventSearch/constants';
import SearchResultsContainer from '../eventSearch/searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getNextPage } from '../eventSearch/utils';
import styles from './courseSearchPageContainer.module.scss';
import CourseSearch from './Search';

const CourseSearchPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();

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

  const scrollToResultList = () => {
    if (isSmallScreen) {
      scroller.scrollTo('resultList', {
        delay: 0,
        duration: 1000,
        offset: -50,
        smooth: true,
      });
    }
  };

  const scrollToEventCard = (id: string) => {
    scroller.scrollTo(id, {
      delay: 0,
      duration: 300,
      offset: -50,
      smooth: true,
    });
  };

  React.useEffect(() => {
    if (location.search && location.state?.scrollToResults) {
      scrollToResultList();
    } else if (location.state?.eventId) {
      scrollToEventCard(getLargeEventCardId(location.state.eventId));
      // Clear eventId value to keep scroll position correctly
      const state = { ...location.state };
      delete state.eventId;
      history.replace({ state });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper
      title="courseSearch.title"
      className={styles.courseSearchPageContainer}
    >
      <CourseSearch scrollToResultList={scrollToResultList} />
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
