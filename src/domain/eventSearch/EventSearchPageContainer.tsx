import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useLocation, withRouter } from 'react-router';
import { scroller } from 'react-scroll';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import SrOnly from '../../common/components/srOnly/SrOnly';
import { useEventListQuery } from '../../generated/graphql';
import useIsSmallScreen from '../../hooks/useIsSmallScreen';
import useLocale from '../../hooks/useLocale';
import PageWrapper from '../app/layout/PageWrapper';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from './constants';
import { getEventFilters, getNextPage } from './EventListUtils';
import styles from './eventSearchPage.module.scss';
import Search from './Search';
import SearchResultList from './searchResultList/SearchResultList';

const EventSearchPageContainer: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const eventFilters = React.useMemo(() => {
    return getEventFilters({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
    });
  }, [locale, searchParams]);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const isSmallScreen = useIsSmallScreen();

  const { data: eventsData, fetchMore, loading } = useEventListQuery({
    notifyOnNetworkStatusChange: true,
    ssr: false,
    variables: eventFilters,
  });

  const handleLoadMore = async () => {
    const page = getNextPage(eventsData);
    setIsFetchingMore(true);

    if (page) {
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
          ...eventFilters,
          page: page,
        },
      });
    }
    setIsFetchingMore(false);
  };

  const scrollToResultList = () => {
    if (isSmallScreen) {
      scroller.scrollTo('resultList', {
        delay: 0,
        duration: 600,
        offset: -50,
        smooth: true,
      });
    }
  };

  React.useEffect(() => {
    if (search) {
      scrollToResultList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper
      className={styles.eventSearchPageWrapper}
      title="eventSearch.title"
    >
      <SrOnly as="h1">{t('eventSearch.title')}</SrOnly>
      <Search scrollToResultList={scrollToResultList} />
      <div id="resultList">
        <LoadingSpinner isLoading={!isFetchingMore && loading}>
          {eventsData && (
            <SearchResultList
              eventsData={eventsData}
              loading={isFetchingMore}
              onLoadMore={handleLoadMore}
            />
          )}
        </LoadingSpinner>
      </div>
    </PageWrapper>
  );
};

export default withRouter(EventSearchPageContainer);
