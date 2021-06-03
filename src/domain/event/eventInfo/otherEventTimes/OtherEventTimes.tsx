import {
  IconAngleDown,
  IconAngleUp,
  IconArrowRight,
  IconCalendarPlus,
} from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import InfoWithIcon from '../../../../common/components/infoWithIcon/InfoWithIcon';
import linkStyles from '../../../../common/components/link/link.module.scss';
import SkeletonLoader from '../../../../common/components/skeletonLoader/SkeletonLoader';
import LoadingSpinner from '../../../../common/components/spinner/LoadingSpinner';
import useLocale from '../../../../hooks/useLocale';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { getEventTypeByEventTypeId } from '../../EventUtils';
import { useOtherEventTimes } from '../../queryUtils';
import { EVENT_ROUTE_MAPPER, EventFields, EventType } from '../../types';
import styles from './otherEventTimes.module.scss';

const EVENTS_LIST_LIMIT = 3;

export const otherEventTimesListTestId = 'other-event-times-list';

const OtherEventTimes: React.FC<{event: EventFields;}> = ({ event }) => {
  const { t } = useTranslation();
  const [isListOpen, setIsListOpen] = React.useState(false);

  const { superEventId, loading, events, isFetchingMore } = useOtherEventTimes(event);

  if (!superEventId) return null;

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
        title={t('event.otherTimes.title')}
      >
        <EventTimeList
          id={otherEventTimesListTestId}
          events={shownEvents}
        />
        {events.length > EVENTS_LIST_LIMIT && (
          <button
            className={linkStyles.link}
            onClick={toggleList}
            aria-expanded={isListOpen}
          >
            {isListOpen
              ? t('event.otherTimes.buttonHide')
              : t('event.otherTimes.buttonShow')}
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

export const EventTimeList: React.FC<{
  events: EventFields[];
  id: string;
}> = ({ events, id = otherEventTimesListTestId }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { search } = useLocation();

  const moveToEventPage = (eventId: string, eventType: EventType) => {
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
              // Events can have different event type id than it's super event or sibling has - purposely or accidentally.
              onClick={() => moveToEventPage(event.id, event?.typeId ? getEventTypeByEventTypeId(event.typeId) : 'event')}
              aria-label={t('event.otherTimes.buttonReadMore', {
                date,
              })}
            >
              <span>{date}</span>
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

export default OtherEventTimes;
