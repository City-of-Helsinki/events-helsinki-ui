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
import { EVENT_ROUTE_MAPPER, EventFields, EventType } from '../../types';
import styles from './otherEventTimes.module.scss';

interface Props {
  isFetchingMore: boolean;
  loading: boolean;
  events: EventFields[];
  eventType: EventType;
}

const EVENTS_LIST_LIMIT = 3;

export const otherEventTimesListTestId = 'other-event-times-list';

const OtherEventTimes: React.FC<Props> = ({
  events,
  loading,
  isFetchingMore,
  eventType,
}) => {
  const { t } = useTranslation();
  const [isListOpen, setIsListOpen] = React.useState(false);

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
          eventType={eventType}
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

const EventTimeList: React.FC<{
  events: EventFields[];
  eventType: EventType;
  id: string;
}> = ({ events, eventType, id = otherEventTimesListTestId }) => {
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
