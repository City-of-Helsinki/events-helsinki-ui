import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import { CollectionFieldsFragment } from '../../../generated/graphql';
import Container from '../../app/layout/Container';
import { getEventIdsFromUrls } from '../../event/EventUtils';
import { EventType } from '../../event/types';
import styles from './curatedEventList.module.scss';
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
  const [showAllPastEvents, setShowAllPastEvents] = React.useState(false);

  const {
    events,
    pastEvents,
    isFetchingMore,
    loading,
    onLoadMoreEvents,
    hasMoreEventsToLoad,
    eventCursorIndex,
  } = usePaginatedEventsByIdsQuery(eventIds, eventType);

  const visiblePastEvent = pastEvents.slice(
    0,
    showAllPastEvents ? undefined : PAST_EVENTS_DEFAULT_SIZE
  );

  const handleShowAllPastEvents = () => {
    setShowAllPastEvents(true);
  };

  return (
    <div className={styles.curatedEventListContainer} data-testid={testId}>
      <h3>{title}</h3>
      <LoadingSpinner isLoading={loading}>
        {(!!events.length || !!pastEvents.length) && (
          <div className={styles.curatedEventList}>
            <div>{!events.length && <OnlyExpiredEvents />}</div>
            <div>
              {!!events.length && (
                <EventCards events={events} eventType={eventType} />
              )}
              {hasMoreEventsToLoad && (
                <div className={styles.loadMoreWrapper}>
                  <LoadingSpinner
                    hasPadding={!events.length}
                    isLoading={isFetchingMore}
                  >
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
              )}
              {!!visiblePastEvent.length && (
                <>
                  <h3 className={styles.titlePastRecommendations}>
                    {t('collection.titlePastRecommendations')}
                  </h3>
                  <EventCards
                    events={visiblePastEvent}
                    onShowMore={handleShowAllPastEvents}
                    eventType={eventType}
                    showMoreButton={
                      !showAllPastEvents &&
                      pastEvents.length > PAST_EVENTS_DEFAULT_SIZE
                    }
                  />
                </>
              )}
            </div>
          </div>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default CuratedEvents;
