import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import SimilarEventCard from '../../../common/components/eventCard/EventCard';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  EventFieldsFragment,
  useEventListQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getSearchQuery } from '../../../util/searchUtils';
// Use same page size as on event search page
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from '../../eventSearch/constants';
import { getEventFilters } from '../../eventSearch/EventListUtils';
import { SIMILAR_EVENTS_AMOUNT } from '../constants';
import styles from './similarEvents.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const SimilarEvents: React.FC<Props> = ({ event }) => {
  const locale = useLocale();
  const { search } = useLocation();
  const eventSearch = getSearchQuery({
    categories: [],
    dateTypes: [],
    divisions: [],
    end: null,
    isFree: false,
    keywordNot: [],
    keywords: event.keywords.map(keyword => keyword.id || '').filter(e => e),
    places: [],
    publisher: null,
    start: null,
    text: '',
  });
  // Filter by search query if exists, if not filter by event keywords
  const searchParams = new URLSearchParams(search ? search : eventSearch);
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
  const { t } = useTranslation();

  const { data: eventsData, loading } = useEventListQuery({
    ssr: false,
    variables: eventFilters,
  });

  // To display only certain amount of events.
  // Always fetch data by using same page size to get events from cache
  const events =
    eventsData && !!eventsData.eventList.data.length
      ? eventsData.eventList.data
          // Don't show current event on the list
          .filter(item => item.id !== event.id)
          .slice(0, SIMILAR_EVENTS_AMOUNT)
      : [];

  return (
    <div className={styles.similarEvents}>
      <LoadingSpinner hasPadding={false} isLoading={loading}>
        {!!events.length && (
          <>
            <h2 className={styles.similarEventsTitle}>
              {t('event.similarEvents.title')}
            </h2>
            <div className={styles.similarEventList}>
              {events.map(item => {
                return <SimilarEventCard key={item.id} event={item} />;
              })}
            </div>
          </>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default SimilarEvents;
