import { IconAngleDown, IconAngleUp, IconLayers } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import linkStyles from '../../../common/components/link/link.module.scss';
import SkeletonLoader from '../../../common/components/skeletonLoader/SkeletonLoader';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import { getEventTypeByEventTypeId } from '../EventUtils';
import { useSubEvents, useSubEventsQueryVariables } from '../queryUtils';
import { EventFields, SuperEventResponse } from '../types';
import { Eventlist } from './eventList/EventList';
import styles from './eventList/eventList.module.scss';

const EVENTS_LIST_LIMIT = 3;
export const subEventsListTestId = 'sub-events-list';
export const superEventTestId = 'super-event';

const SubEvents: React.FC<{ event: EventFields }> = ({ event }) => {
  const { t } = useTranslation();
  const [isListOpen, setIsListOpen] = React.useState(false);
  const eventType = event.typeId
    ? getEventTypeByEventTypeId(event.typeId)
    : 'event';

  const { superEventId, variables } = useSubEventsQueryVariables(event);

  const { subEvents: events, isFetchingMore, loading } = useSubEvents(
    event,
    variables,
    superEventId
  );
  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  if (loading) {
    return (
      <div
        className={styles.skeletonWrapper}
        data-testid="skeleton-loader-wrapper"
      >
        <SkeletonLoader />
      </div>
    );
  }

  if (events.length === 0) {
    return null;
  }

  const shownEvents = isListOpen ? events : events.slice(0, EVENTS_LIST_LIMIT);

  return (
    <div className={styles.eventList}>
      <InfoWithIcon
        icon={<IconLayers aria-hidden />}
        title={t('event.subEvents.title')}
      >
        <Eventlist
          id={subEventsListTestId}
          events={shownEvents}
          eventType={eventType}
        />
        {events.length > EVENTS_LIST_LIMIT && (
          <button
            className={linkStyles.link}
            onClick={toggleList}
            aria-expanded={isListOpen}
          >
            {isListOpen
              ? t('event.relatedEvents.buttonHide')
              : t('event.relatedEvents.buttonShow')}
            {isListOpen ? (
              <IconAngleUp aria-hidden />
            ) : (
              <IconAngleDown aria-hidden />
            )}
          </button>
        )}
      </InfoWithIcon>
      <LoadingSpinner
        hasPadding={false}
        isLoading={loading || isFetchingMore}
      />
    </div>
  );
};

const SuperEvent: React.FC<{ superEvent: SuperEventResponse | undefined }> = ({
  superEvent,
}) => {
  const { t } = useTranslation();

  if (!superEvent || !superEvent.data) return null;

  if (superEvent?.status === 'pending') return <SkeletonLoader />;

  const eventType = superEvent.data.typeId
    ? getEventTypeByEventTypeId(superEvent.data.typeId)
    : 'event';

  return (
    <div className={styles.eventList}>
      <InfoWithIcon
        icon={<IconLayers aria-hidden />}
        title={t('event.superEvent.title')}
      >
        <Eventlist
          id={superEventTestId}
          events={[superEvent.data]}
          eventType={eventType}
        />
      </InfoWithIcon>
    </div>
  );
};

export { SuperEvent, SubEvents };
