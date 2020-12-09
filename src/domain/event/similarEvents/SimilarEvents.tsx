import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import Container from '../../app/layout/Container';
import EventCard from '../eventCard/EventCard';
import { EventFields, EventType } from '../types';
import styles from './similarEvents.module.scss';

interface Props {
  events: EventFields[];
  loading: boolean;
  eventsType: EventType;
}

const SimilarEvents: React.FC<Props> = ({ events, loading, eventsType }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.similarEvents}>
      <LoadingSpinner hasPadding={false} isLoading={loading}>
        {!!events.length && (
          <Container>
            <h2 className={styles.similarEventsTitle}>
              {t('event.similarEvents.title')}
            </h2>
            <div className={styles.similarEventList}>
              {events.map((item) => {
                return (
                  <EventCard
                    key={item.id}
                    event={item}
                    eventType={eventsType}
                  />
                );
              })}
            </div>
          </Container>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default SimilarEvents;
