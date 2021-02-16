import classNames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  CollectionFieldsFragment,
  useEventsByIdsQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import Container from '../../app/layout/Container';
import { getEventIdFromUrl, isEventClosed } from '../../event/EventUtils';
import styles from './curatedEventList.module.scss';
import EventCards from './EventCards';
import OnlyExpiredEvents from './OnlyExpiredEvents';

const PAST_EVENTS_DEFAULT_SIZE = 4;
const PAGE_SIZE = 10;
const INITIAL_PAGE = 1;

interface Props {
  collection: CollectionFieldsFragment;
}

const CuratedEventList: React.FC<Props> = ({ collection }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [showAllPastEvents, setShowAllPastEvents] = React.useState(false);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const eventIds = React.useMemo(
    () =>
      collection.curatedEvents
        .map((url) => getEventIdFromUrl(url) as string)
        .filter((e) => e),
    [collection.curatedEvents]
  );

  const queryVariables = {
    ids: eventIds.slice(0, PAGE_SIZE),
    include: ['keywords', 'location'],
  };

  const { data: eventsData, loading, fetchMore } = useEventsByIdsQuery({
    variables: queryVariables,
  });

  const page = React.useRef(
    // if eventsByIds is available on first render, they are coming from cache
    // Initialize page number based on its length
    eventsData?.eventsByIds.length
      ? Math.ceil(eventsData?.eventsByIds.length / PAGE_SIZE)
      : INITIAL_PAGE
  );
  const currentEventsCount = page.current * PAGE_SIZE;
  const isMoreToLoad = currentEventsCount < eventIds.length;

  const events =
    eventsData?.eventsByIds.filter((event) => !isEventClosed(event)) || [];

  const pastEvents =
    eventsData?.eventsByIds.filter((event) => isEventClosed(event)) || [];

  const handleShowAllPastEvents = () => {
    setShowAllPastEvents(true);
  };

  const onLoadMoreEvents = async () => {
    if (isMoreToLoad) {
      setIsFetchingMore(true);
      try {
        await fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            const events = [
              ...prev.eventsByIds,
              ...fetchMoreResult.eventsByIds,
            ];
            fetchMoreResult.eventsByIds = events;
            return fetchMoreResult;
          },
          variables: {
            ids: eventIds.slice(
              currentEventsCount,
              currentEventsCount + PAGE_SIZE
            ),
            include: ['keywords', 'location'],
          },
        });
        page.current = page.current + 1;
      } catch (e) {
        toast.error(t('collection.eventList.errorLoadMore'));
      }

      setIsFetchingMore(false);
    }
  };

  const visiblePastEvent = pastEvents.slice(
    0,
    showAllPastEvents ? undefined : PAST_EVENTS_DEFAULT_SIZE
  );

  return (
    <LoadingSpinner isLoading={loading}>
      {!!eventsData && !!eventsData.eventsByIds.length && (
        <div className={styles.curatedEventList}>
          <div
            className={classNames(styles.greyBackground, {
              [styles.hasEvents]: events.length,
            })}
          >
            <Container>
              <h2>
                {getLocalisedString(collection.curatedEventsTitle, locale)}
              </h2>
              {!events.length && <OnlyExpiredEvents />}
            </Container>
          </div>
          <div
            className={classNames(styles.content, {
              [styles.hasEvents]: events.length,
            })}
          >
            <Container>
              {!!events.length && <EventCards events={events} />}
              {!!visiblePastEvent.length && (
                <>
                  <h3 className={styles.titlePastRecommendations}>
                    {t('collection.titlePastRecommendations')}
                  </h3>
                  <EventCards
                    events={visiblePastEvent}
                    onShowMore={handleShowAllPastEvents}
                    showMoreButton={
                      !showAllPastEvents &&
                      pastEvents.length > PAST_EVENTS_DEFAULT_SIZE
                    }
                  />
                </>
              )}
              {isMoreToLoad && (
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
                        count: eventIds.length - currentEventsCount,
                      })}
                    </Button>
                  </LoadingSpinner>
                </div>
              )}
            </Container>
          </div>
        </div>
      )}
    </LoadingSpinner>
  );
};

export default CuratedEventList;
