import {
  IconAngleDown,
  IconAngleUp,
  IconArrowRight,
  IconCalendarPlus,
} from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import linkStyles from '../../../common/components/link/link.module.scss';
import SkeletonLoader from '../../../common/components/skeletonLoader/SkeletonLoader';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import useLocale from '../../../hooks/useLocale';
import getDateRangeStr from '../../../util/getDateRangeStr';
import { getEventTypeByEventTypeId } from '../EventUtils';
import { useSubEvents, useSubEventsQueryVariables } from '../queryUtils';
import {
  EVENT_ROUTE_MAPPER,
  EventFields,
  EventType,
  SuperEventResponse,
} from '../types';
import styles from './otherEventTimes/otherEventTimes.module.scss';

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
    <div className={styles.otherEventTimes}>
      <InfoWithIcon
        icon={<IconCalendarPlus aria-hidden />}
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
              ? t('event.subEvents.buttonHide')
              : t('event.subEvents.buttonShow')}
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

export const Eventlist: React.FC<{
  events: EventFields[];
  eventType: EventType;
  id: string;
}> = ({ events, eventType, id = subEventsListTestId }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const moveToEventPage = (eventId: string) => {
    const eventUrl = `/${locale}${EVENT_ROUTE_MAPPER[eventType].replace(
      ':id',
      eventId
    )}${search}`;
    history.push(eventUrl);
  };
  return (
    <ul className={styles.timeList} data-testid={id}>
      {events.map((event) => {
        const date = event.startTime
          ? getDateRangeStr({
              start: event.startTime,
              end: event.endTime,
              includeTime: true,
              locale,
              timeAbbreviation: t('commons.timeAbbreviation'),
            })
          : '';
        return (
          <li key={event.id}>
            <button
              className={styles.listButton}
              onClick={() => moveToEventPage(event.id)}
              aria-label={t('event.otherTimes.buttonReadMore', {
                date,
              })}
            >
              <span>
                {date} {event.name.fi}
              </span>
              <div className={styles.arrowContainer}>
                <IconArrowRight aria-hidden />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const SuperEvent: React.FC<{ superEvent: SuperEventResponse | undefined }> = ({
  superEvent,
}) => {
  const { t } = useTranslation();
  console.debug('superEvent', superEvent);
  if (!superEvent || !superEvent.data) return null;

  if (superEvent?.status === 'pending') return <SkeletonLoader />;
  console.debug('superEvent data', superEvent.data);
  const eventType = superEvent.data.typeId
    ? getEventTypeByEventTypeId(superEvent.data.typeId)
    : 'event';

  return (
    <div className={styles.otherEventTimes}>
      <InfoWithIcon
        icon={<IconCalendarPlus aria-hidden />}
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

export default SubEvents;
export { SuperEvent };
