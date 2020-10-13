import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

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

interface Props {
  collection: CollectionFieldsFragment;
}

const CuratedEventList: React.FC<Props> = ({ collection }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [showAllPastEvents, setShowAllPastEvents] = React.useState(false);
  const eventIds = React.useMemo(
    () =>
      collection.curatedEvents
        .map((url) => getEventIdFromUrl(url) as string)
        .filter((e) => e),
    [collection.curatedEvents]
  );

  const { data: eventsData, loading } = useEventsByIdsQuery({
    variables: { ids: eventIds, include: ['keywords', 'location'] },
  });

  const events =
    eventsData?.eventsByIds.filter((event) => !isEventClosed(event)) || [];

  const pastEvents =
    eventsData?.eventsByIds.filter((event) => isEventClosed(event)) || [];

  const handleShowAllPastEvents = () => {
    setShowAllPastEvents(true);
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
            </Container>
          </div>
        </div>
      )}
    </LoadingSpinner>
  );
};

export default CuratedEventList;
