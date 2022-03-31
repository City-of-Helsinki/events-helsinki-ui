import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { scroller } from 'react-scroll';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import SrOnly from '../../common/components/srOnly/SrOnly';
import {
  QueryEventListArgs,
  useEventListQuery,
  useLandingPagesQuery,
} from '../../generated/graphql';
import useIsSmallScreen from '../../hooks/useIsSmallScreen';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { getLargeEventCardId } from '../event/EventUtils';
import EventList from '../eventList/EventList';
import LandingPageMeta from '../landingPage/landingPageMeta/LandingPageMeta';
import { isLanguageSupported } from '../landingPage/utils';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from './constants';
import styles from './eventSearchPage.module.scss';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';
import { getEventSearchVariables, getNextPage } from './utils';

const SearchPage: React.FC<{
  SearchComponent: React.FC<{
    scrollToResultList: () => void;
    'data-testid'?: string;
  }>;
  pageTitle: string;
}> = ({ SearchComponent, pageTitle }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const location = useLocation();
  const params = useParams<{ place?: string }>();
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const isSmallScreen = useIsSmallScreen();

  const eventFilters = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.START_TIME,
      superEventType: ['umbrella', 'none'],
    });
    return variables;
  }, [locale, location.search, params.place]);

  const { data: landingPageData } = useLandingPagesQuery({
    variables: { visibleOnFrontpage: true },
  });
  const landingPage = landingPageData?.landingPages.data.find((page) =>
    isLanguageSupported(page, locale)
  );

  const {
    data: eventsData,
    fetchMore,
    loading: isLoadingEvents,
  } = useEventListQuery({
    notifyOnNetworkStatusChange: true,
    ssr: false,
    variables: eventFilters,
  });

  const eventsList = eventsData?.eventList;

  const handleLoadMore = async () => {
    const page = eventsData?.eventList.meta
      ? getNextPage(eventsData.eventList.meta)
      : null;

    setIsFetchingMore(true);

    if (page) {
      try {
        await fetchMore({
          variables: {
            page,
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
      // location.search seems to reset if not added here (...location)
      history.replace({ ...location, state });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper className={styles.eventSearchPageWrapper} title={pageTitle}>
      {landingPage && <LandingPageMeta landingPage={landingPage} noTitle />}
      <SrOnly as="h1">{t(pageTitle)}</SrOnly>
      <SearchComponent
        scrollToResultList={scrollToResultList}
        data-testid="searchContainer"
      />
      <div
        className={styles.resultList}
        id="resultList"
        data-testid="resultList"
      >
        <SrOnly aria-live="polite" aria-atomic={true}>
          {isLoadingEvents
            ? t('eventSearch.ariaLiveLoading')
            : t('eventSearch.ariaLiveSearchReady', {
                count: eventsList?.meta.count,
              })}
        </SrOnly>
        <LoadingSpinner isLoading={!isFetchingMore && isLoadingEvents}>
          {eventsList && (
            <MainContent offset={-70}>
              <SearchResultsContainer
                eventsCount={eventsList.meta.count}
                loading={isLoadingEvents}
                eventList={
                  <EventList
                    cardSize="large"
                    events={eventsList.data}
                    hasNext={!!eventsList.meta.next}
                    count={eventsList.meta.count}
                    loading={isLoadingEvents}
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

export default SearchPage;
