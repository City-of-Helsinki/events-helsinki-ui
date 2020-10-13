import classNames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import { EventListQuery } from '../../../generated/graphql';
import EventCard from '../../event/eventCard/EventCard';
import LargeEventCard from '../../event/eventCard/LargeEventCard';
import styles from './eventList.module.scss';

interface Props {
  buttonCentered?: boolean;
  cardSize?: 'default' | 'large';
  eventsData: EventListQuery;
  loading: boolean;
  onLoadMore: () => void;
}

const EventList: React.FC<Props> = ({
  buttonCentered = false,
  cardSize = 'default',
  eventsData,
  loading,
  onLoadMore,
}) => {
  const { t } = useTranslation();
  const events = eventsData.eventList.data;
  const { count } = eventsData.eventList.meta;
  const eventsLeft = count - events.length;

  return (
    <div className={classNames(styles.eventListWrapper, styles[cardSize])}>
      <div className={styles.eventsWrapper}>
        {events.map((event) => {
          switch (cardSize) {
            case 'default':
              return <EventCard key={event.id} event={event} />;
            case 'large':
            default:
              return <LargeEventCard key={event.id} event={event} />;
          }
        })}
      </div>
      <div
        className={classNames(styles.loadMoreWrapper, {
          [styles.buttonCentered]: buttonCentered,
        })}
      >
        <LoadingSpinner hasPadding={!events.length} isLoading={loading}>
          {!!eventsData.eventList.meta.next && (
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
