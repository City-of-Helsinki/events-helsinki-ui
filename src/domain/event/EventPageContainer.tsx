import React from "react";
import { useLocation, useParams } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../generated/graphql";
import isClient from "../../util/isClient";
import Container from "../app/layout/Container";
import Layout from "../app/layout/Layout";
import EventClosedHero from "./EventClosedHero";
import EventContent from "./EventContent";
import EventHero from "./EventHero";
import styles from "./eventPage.module.scss";
import EventPageMeta from "./EventPageMeta";
import { isEventClosed } from "./EventUtils";
import SimilarEvents from "./SimilarEvents";

interface RouteParams {
  id: string;
}

const EventPageContainer: React.FC = () => {
  const { pathname } = useLocation();
  const params = useParams<RouteParams>();
  const eventId = params.id;
  const { data: eventData, loading } = useEventDetailsQuery({
    variables: { id: eventId }
  });

  React.useEffect(() => {
    // Scroll to top when event changes. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const eventClosed = !eventData || isEventClosed(eventData.eventDetails);

  return (
    <Layout>
      <div className={styles.eventPageWrapper}>
        <LoadingSpinner isLoading={loading}>
          {eventData && (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              <EventPageMeta eventData={eventData} />
              {!!eventClosed ? (
                <EventClosedHero />
              ) : (
                <EventHero eventData={eventData} />
              )}
              <Container>
                {/* Show event content only if event is open */}
                {!eventClosed && <EventContent eventData={eventData} />}
                {/* Hide similar event on SSR to make initial load faster */}
                {isClient && <SimilarEvents eventData={eventData} />}
              </Container>
            </>
          )}
        </LoadingSpinner>
      </div>
    </Layout>
  );
};

export default EventPageContainer;
