import { last } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import ErrorHero from '../../common/components/error/ErrorHero';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import {
  useEventDetailsLazyQuery,
  useEventDetailsQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import { getFeatureFlags } from '../../util/featureFlags';
import isClient from '../../util/isClient';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventClosedHero from './eventClosedHero/EventClosedHero';
import EventContent from './eventContent/EventContent';
import EventHero from './eventHero/EventHero';
import styles from './eventPage.module.scss';
import EventPageMeta from './eventPageMeta/EventPageMeta';
import { isEventClosed } from './EventUtils';
import { useSimilarEventsQuery } from './queryUtils';
import SimilarEvents from './similarEvents/SimilarEvents';
import { EventFields } from './types';

interface RouteParams {
  id: string;
}

const EventPageContainer: React.FC = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const params = useParams<RouteParams>();
  const eventId = params.id;
  const locale = useLocale();
  const [superEventId, setSuperEventId] = useState('');

  const { data: eventData, loading } = useEventDetailsQuery({
    variables: {
      id: eventId,
      include: ['in_language', 'keywords', 'location', 'audience'],
    },
  });

  const [getData, { data: superEvent }] = useEventDetailsLazyQuery({
    variables: {
      id: superEventId,
      include: ['in_language', 'keywords', 'location', 'audience'],
    },
  });

  const event = eventData?.eventDetails;

  useEffect(() => {
    if (event) {
      setSuperEventId(
        last(event.superEvent?.internalId?.split('/').filter((e) => e)) || ''
      );
    }
  }, [event]);

  useEffect(() => {
    if (superEventId) {
      getData();
    }
  }, [getData, superEventId]);

  const eventClosed = !event || isEventClosed(event);
  return (
    <PageWrapper className={styles.eventPageWrapper} title="event.title">
      <MainContent offset={-70}>
        <LoadingSpinner isLoading={loading}>
          {event ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              <EventPageMeta event={event} />
              {eventClosed ? (
                <EventClosedHero />
              ) : (
                <>
                  <EventHero
                    event={event}
                    superEvent={superEvent?.eventDetails}
                    eventType="event"
                  />
                  <EventContent event={event} eventType="event" />
                </>
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {isClient && getFeatureFlags().SHOW_SIMILAR_EVENTS && (
                <SimilarEventsContainer event={event} />
              )}
            </>
          ) : (
            <ErrorHero
              text={t('event.notFound.text')}
              title={t('event.notFound.title')}
            >
              <Link to={`/${locale}${ROUTES.EVENTS}${search}`}>
                {t('event.notFound.linkSearchEvents')}
              </Link>
            </ErrorHero>
          )}
        </LoadingSpinner>
      </MainContent>
    </PageWrapper>
  );
};

// this wrapper/container component is needed because we want to query similar events
// in the client side but hooks cannot be conditional :)
const SimilarEventsContainer: React.FC<{ event: EventFields }> = ({
  event,
}) => {
  const { data, loading } = useSimilarEventsQuery(event);

  return <SimilarEvents events={data} loading={loading} eventsType="event" />;
};

export default EventPageContainer;
