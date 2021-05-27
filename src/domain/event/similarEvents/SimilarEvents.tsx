import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import Container from '../../app/layout/Container';
// Use same page size as on event search page
import EventCard from '../eventCard/EventCard';
import { useSimilarEventsQuery } from '../queryUtils';
import { EventFields, EventType } from '../types';
import styles from './similarEvents.module.scss';

interface Props {
  event: EventFields;
  eventType: EventType;
}

export const similarEventsListTestId = 'similar-events-list';

const SimilarEvents: React.FC<Props> = ({ event, eventType }) => {
  const { t } = useTranslation();
  const { data: events, loading } = useSimilarEventsQuery(event, eventType);

  return (
    <div className={styles.similarEvents}>
      <LoadingSpinner hasPadding={false} isLoading={loading}>
        {events?.length && (
          <Container>
            <h2 className={styles.similarEventsTitle}>
              {t('event.similarEvents.title')}
            </h2>
            <div
              className={styles.similarEventList}
              data-testid={similarEventsListTestId}
            >
              {events.map((item) => {
                return (
                  <EventCard key={item.id} event={item} eventType={eventType} />
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
