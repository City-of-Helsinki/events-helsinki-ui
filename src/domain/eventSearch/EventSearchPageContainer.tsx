import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import SrOnly from '../../common/components/srOnly/SrOnly';
import { useEventListQuery } from '../../generated/graphql';
import useIsSmallScreen from '../../hooks/useIsSmallScreen';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { EventType } from '../event/eventCard/types';
import { getLargeEventCardId } from '../event/EventUtils';
import EventList from '../eventList/EventList';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from './constants';
import styles from './eventSearchPage.module.scss';
import Search from './Search';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getNextPage } from './utils';

const EventSearchPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
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
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const isSmallScreen = useIsSmallScreen();

  const { data: eventsData, fetchMore, loading } = useEventListQuery({
    notifyOnNetworkStatusChange: true,
    ssr: false,
    variables: eventFilters,
  });

  const handleLoadMore = async () => {
    const page = eventsData?.eventList.meta
      ? getNextPage(eventsData.eventList.meta)
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
      history.replace({ ...location, state });
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
        <SrOnly aria-live="polite" aria-atomic={true}>
          {loading
            ? t('eventSearch.ariaLiveLoading')
            : t('eventSearch.ariaLiveSearchReady', {
                count: eventsData?.eventList.meta.count,
              })}
        </SrOnly>
        <LoadingSpinner isLoading={!isFetchingMore && loading}>
          {eventsData && (
            <MainContent offset={-70}>
              <SearchResultsContainer
                count={eventsData.eventList.meta.count}
                loading={loading}
                listComponent={
                  <EventList
                    cardSize="large"
                    events={eventsData.eventList.data}
                    eventType={EventType.EVENT}
                    hasNext={!!eventsData.eventList.meta.next}
                    count={eventsData.eventList.meta.count}
                    loading={loading}
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

export default EventSearchPageContainer;
