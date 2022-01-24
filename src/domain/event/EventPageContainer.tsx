import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import ErrorHero from '../../common/components/error/ErrorHero';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import {
  EventDetailsDocument,
  useEventDetailsQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import isClient from '../../util/isClient';
import MainContent from '../app/layout/MainContent';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventClosedHero from './eventClosedHero/EventClosedHero';
import EventContent from './eventContent/EventContent';
import EventHero from './eventHero/EventHero';
import styles from './eventPage.module.scss';
import EventPageMeta from './eventPageMeta/EventPageMeta';
import { getEventIdFromUrl, isEventClosed } from './EventUtils';
import SimilarEvents from './similarEvents/SimilarEvents';
import { SuperEventResponse } from './types';

interface RouteParams {
  id: string;
}

export interface EventPageContainerProps {
  showSimilarEvents?: boolean;
}

const EventPageContainer: React.FC<EventPageContainerProps> = ({
  showSimilarEvents = true,
}) => {
  const apolloClient = useApolloClient();
  const { t } = useTranslation();
  const { search } = useLocation();
  const params = useParams<RouteParams>();
  const eventId = params.id;
  const locale = useLocale();
  const [superEvent, setSuperEvent] = React.useState<SuperEventResponse>({
    data: null,
    status: 'pending',
  });

  const { data: eventData, loading } = useEventDetailsQuery({
    variables: {
      id: eventId,
      include: ['in_language', 'keywords', 'location', 'audience'],
    },
  });

  const event = eventData?.eventDetails;
  const superEventId = getEventIdFromUrl(
    event?.superEvent?.internalId ?? '',
    'event'
  );

  React.useLayoutEffect(() => {
    if (superEventId) {
      getSuperEventData();
    } else if (event) {
      setSuperEvent({ data: null, status: 'resolved' });
    }
    async function getSuperEventData() {
      try {
        const { data } = await apolloClient.query({
          query: EventDetailsDocument,
          variables: {
            id: superEventId,
            include: ['in_language', 'keywords', 'location', 'audience'],
          },
        });
        setSuperEvent({ data: data.eventDetails, status: 'resolved' });
      } catch (e) {
        setSuperEvent({ data: null, status: 'resolved' });
      }
    }
  }, [apolloClient, event, superEventId]);

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
                  <EventHero event={event} superEvent={superEvent} />
                  <EventContent event={event} superEvent={superEvent} />
                </>
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {isClient && showSimilarEvents && <SimilarEvents event={event} />}
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

export default EventPageContainer;
