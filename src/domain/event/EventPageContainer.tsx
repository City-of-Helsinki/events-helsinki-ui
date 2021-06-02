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
import EventClosedHero from './eventClosedHero/EventClosedHero';
import EventContent from './eventContent/EventContent';
import EventHero from './eventHero/EventHero';
import styles from './eventPage.module.scss';
import EventPageMeta from './eventPageMeta/EventPageMeta';
import { getEventIdFromUrl, isEventClosed } from './EventUtils';
import SimilarEvents from './similarEvents/SimilarEvents';
import { EVENTS_ROUTE_MAPPER, EventType, SuperEventResponse } from './types';

interface RouteParams {
  id: string;
}

export interface EventPageContainerProps {
  eventType: EventType;
  showSimilarEvents?: boolean;
}

const eventPageStyles = {
  event: styles.eventPageWrapper,
  course: styles.coursePageWrapper,
};

const EventPageContainer: React.FC<EventPageContainerProps> = ({
  eventType,
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
    const isCoursePage = eventType === 'course';
    // Only course page uses super event
    if (superEventId && isCoursePage) {
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
        setSuperEvent({ data: data.courseDetails, status: 'resolved' });
      } catch (e) {
        setSuperEvent({ data: null, status: 'resolved' });
      }
    }
  }, [apolloClient, event, superEventId, eventType]);

  const eventClosed = !event || isEventClosed(event);
  return (
    <PageWrapper className={eventPageStyles[eventType]} title="event.title">
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
                    eventType={eventType}
                    superEvent={superEvent}
                  />
                  <EventContent event={event} eventType={eventType} />
                </>
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {isClient && showSimilarEvents && (
                <SimilarEvents event={event} eventType={eventType} />
              )}
            </>
          ) : (
            <ErrorHero
              text={t('event.notFound.text')}
              title={t('event.notFound.title')}
            >
              <Link to={`/${locale}${EVENTS_ROUTE_MAPPER[eventType]}${search}`}>
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
