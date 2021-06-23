import { IconAngleDown, IconAngleUp, IconCalendarPlus } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import linkStyles from '../../../common/components/link/link.module.scss';
import SkeletonLoader from '../../../common/components/skeletonLoader/SkeletonLoader';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import { useOtherEventTimes } from '../queryUtils';
import { EventFields } from '../types';
import EventList from './eventList/EventList';
import styles from './eventList/eventList.module.scss';

const EVENTS_LIST_LIMIT = 3;

export const otherEventTimesListTestId = 'other-event-times-list';

const OtherEventTimes: React.FC<{ event: EventFields }> = ({ event }) => {
  const { t } = useTranslation();
  const [isListOpen, setIsListOpen] = React.useState(false);

  const { superEventId, loading, events, isFetchingMore } =
    useOtherEventTimes(event);

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
    <div className={styles.eventList}>
      <InfoWithIcon
        icon={<IconCalendarPlus aria-hidden />}
        title={t('event.otherTimes.title')}
      >
        <EventList
          id={otherEventTimesListTestId}
          events={shownEvents}
          showDate
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

export default OtherEventTimes;
