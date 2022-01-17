import classNames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { EventFieldsFragment } from '../../generated/graphql';
import BasicEventCard from '../event/eventCard/EventCard';
import LargeEventCard from '../event/eventCard/LargeEventCard';
import { EventFields } from '../event/types';
import styles from './eventList.module.scss';

const eventCardsMap = {
  default: BasicEventCard,
  large: LargeEventCard,
};

interface Props {
  buttonCentered?: boolean;
  cardSize?: 'default' | 'large';
  events: EventFieldsFragment[];
  count: number;
  loading: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
}

const EventList: React.FC<Props> = ({
  buttonCentered = false,
  cardSize = 'default',
  events,
  loading,
  count,
  hasNext,
  onLoadMore,
}) => {
  const { t } = useTranslation();
  const eventsLeft = count - events.length;
  const EventCard = eventCardsMap[cardSize];

  return (
    <div className={classNames(styles.eventListWrapper, styles[cardSize])}>
      <div className={styles.eventsWrapper}>
        {(events as EventFields[]).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div
        className={classNames(styles.loadMoreWrapper, {
          [styles.buttonCentered]: buttonCentered,
        })}
      >
        <LoadingSpinner hasPadding={!events.length} isLoading={loading}>
          {hasNext && (
            <Button onClick={onLoadMore} variant="success">
              {t('eventSearch.buttonLoadMore', { count: eventsLeft })}
            </Button>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default EventList;
