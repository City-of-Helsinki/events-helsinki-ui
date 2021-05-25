import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { scroller } from 'react-scroll';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import SrOnly from '../../common/components/srOnly/SrOnly';
import { EventListQuery, useLandingPagesQuery } from '../../generated/graphql';
import useIsSmallScreen from '../../hooks/useIsSmallScreen';
import useLocale from '../../hooks/useLocale';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { getLargeEventCardId } from '../event/EventUtils';
import { EventType } from '../event/types';
import EventList from '../eventList/EventList';
import LandingPageMeta from '../landingPage/landingPageMeta/LandingPageMeta';
import { isLanguageSupported } from '../landingPage/utils';
import styles from './eventSearchPage.module.scss';
import SearchResultsContainer from './searchResultList/SearchResultsContainer';

const SearchPage: React.FC<{
  SearchComponent: React.FC<{
    scrollToResultList: () => void;
    'data-testid'?: string;
  }>;
  pageTitle: string;
  eventsList?: EventListQuery['eventList'];
  isLoadingEvents: boolean;
  eventType: EventType;
  handleLoadMore: () => Promise<void>;
  isFetchingMoreEvents: boolean;
}> = ({
  SearchComponent,
  pageTitle,
  eventsList,
  eventType,
  isLoadingEvents,
  handleLoadMore,
  isFetchingMoreEvents,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const location = useLocation();
  const isSmallScreen = useIsSmallScreen();

  const { data: landingPageData } = useLandingPagesQuery({
    variables: { visibleOnFrontpage: true },
  });
  const landingPage = landingPageData?.landingPages.data.find((page) =>
    isLanguageSupported(page, locale)
  );

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
      {landingPage && <LandingPageMeta landingPage={landingPage} />}
      <SrOnly as="h1">{t(pageTitle)}</SrOnly>
      <SearchComponent
        scrollToResultList={scrollToResultList}
        data-testid="searchContainer"
      />
      <div id="resultList" data-testid="resultList">
        <SrOnly aria-live="polite" aria-atomic={true}>
          {isLoadingEvents
            ? t('eventSearch.ariaLiveLoading')
            : t('eventSearch.ariaLiveSearchReady', {
                count: eventsList?.meta.count,
              })}
        </SrOnly>
        <LoadingSpinner isLoading={!isFetchingMoreEvents && isLoadingEvents}>
          {eventsList && (
            <MainContent offset={-70}>
              <SearchResultsContainer
                count={eventsList.meta.count}
                loading={isLoadingEvents}
                eventList={
                  <EventList
                    cardSize="large"
                    events={eventsList.data}
                    eventType={eventType}
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
