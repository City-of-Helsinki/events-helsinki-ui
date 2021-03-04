import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { QueryEventListArgs, useEventListQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from './constants';
import Search from './Search';
import SearchPage from './SearchPage';
import { getEventSearchVariables, getNextPage } from './utils';

const EventSearchPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();
  const params = useParams<{ place?: string }>();
  const searchParams = new URLSearchParams(location.search);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const eventFilters = React.useMemo(() => {
    const variables: QueryEventListArgs = getEventSearchVariables({
      include: ['keywords', 'location'],
      language: locale,
      pageSize: PAGE_SIZE,
      params: searchParams,
      place: params.place,
      sortOrder: EVENT_SORT_OPTIONS.END_TIME,
      superEventType: ['umbrella', 'none'],
    });
    return variables;
  }, [locale, params, searchParams]);

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

  return (
    <SearchPage
      SearchComponent={Search}
      eventsList={eventsData?.eventList}
      handleLoadMore={handleLoadMore}
      isFetchingMoreEvents={isFetchingMore}
      isLoadingEvents={loading}
      pageTitle={t('eventSearch.title')}
      eventType="event"
    />
  );
};

export default EventSearchPageContainer;
