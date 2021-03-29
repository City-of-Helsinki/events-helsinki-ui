import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import { CollectionFieldsFragment } from '../../../generated/graphql';
import Container from '../../app/layout/Container';
import { getEventIdsFromUrls } from '../../event/EventUtils';
import { EventType } from '../../event/types';
import styles from './curatedEvents.module.scss';
import EventCards from './EventCards';
import OnlyExpiredEvents from './OnlyExpiredEvents';
import { usePaginatedEventsByIdsQuery } from './utils';

const PAST_EVENTS_DEFAULT_SIZE = 4;

export const coursesListTestId = 'curated-courses-list';
export const eventsListTestId = 'curated-events-list';

interface Props {
  collection: CollectionFieldsFragment;
}

const CuratedEvents: React.FC<Props> = ({ collection }) => {
  const { t } = useTranslation();
  const { eventIds, courseIds } = React.useMemo(
    () => getEventIdsFromUrls(collection.curatedEvents),
    [collection.curatedEvents]
  );

  return (
    <Container className={styles.container}>
      {!!eventIds.length && (
        <CollectionEventsList
          testId={eventsListTestId}
          eventIds={eventIds}
          eventType="event"
          title={t('collection.curatedEvents.eventsTitle')}
        />
      )}
      {!!courseIds.length && (
        <CollectionEventsList
          testId={coursesListTestId}
          eventIds={courseIds}
          eventType="course"
          title={t('collection.curatedEvents.coursesTitle')}
        />
      )}
    </Container>
  );
};

const CollectionEventsList: React.FC<{
  eventIds: string[];
  title: string;
  eventType: EventType;
  testId: string;
}> = ({ eventIds, title, eventType, testId }) => {
  const { t } = useTranslation();
  const [showAllExpiredEvents, setShowAllExpiredEvents] = React.useState(false);

  const {
    events,
    expiredEvents,
    isFetchingMore,
    loading,
    onLoadMoreEvents,
    hasMoreEventsToLoad,
    eventCursorIndex,
  } = usePaginatedEventsByIdsQuery(eventIds, eventType);

  const collectionHasEvents = events.length + expiredEvents.length > 0;
  const collectionHasUpcomingEvents = !!events.length;
  const visiblePastEvent = expiredEvents.slice(
    0,
    showAllExpiredEvents ? undefined : PAST_EVENTS_DEFAULT_SIZE
  );

  const handleShowAllExpiredEvents = () => {
    setShowAllExpiredEvents(true);
  };

  const ExpiredEventsSection = () => {
    return (
      <>
        <h3 className={styles.titlePastRecommendations}>
          {t('collection.titlePastRecommendations')}
        </h3>
        <EventCards
          events={visiblePastEvent}
          onShowMore={handleShowAllExpiredEvents}
          eventType={eventType}
          showMoreButton={
            !showAllExpiredEvents &&
            expiredEvents.length > PAST_EVENTS_DEFAULT_SIZE
          }
        />
      </>
    );
  };

  const LoadMoreButton = () => (
    <div className={styles.loadMoreWrapper}>
      <LoadingSpinner hasPadding={!events.length} isLoading={isFetchingMore}>
        <Button
          onClick={onLoadMoreEvents}
          variant="success"
          disabled={isFetchingMore}
        >
          {t('eventSearch.buttonLoadMore', {
            count: eventIds.length - eventCursorIndex,
          })}
        </Button>
      </LoadingSpinner>
    </div>
  );

  return (
    <div className={styles.curatedEventListContainer} data-testid={testId}>
      <h3>{title}</h3>
      <LoadingSpinner isLoading={loading}>
        {collectionHasEvents && (
          <div className={styles.curatedEventList}>
            {collectionHasUpcomingEvents ? (
              <>
                <EventCards events={events} eventType={eventType} />
                {hasMoreEventsToLoad && <LoadMoreButton />}
              </>
            ) : (
              <OnlyExpiredEvents />
            )}
            {!!visiblePastEvent.length && <ExpiredEventsSection />}
          </div>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default CuratedEvents;
