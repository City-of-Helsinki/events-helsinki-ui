import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../generated/graphql";
import isClient from "../../util/isClient";
import Container from "../app/layout/Container";
import Layout from "../app/layout/Layout";
import EventClosedHero from "./EventClosedHero";
import EventContent from "./EventContent";
import EventHero from "./EventHero";
import styles from "./eventPage.module.scss";
import { isEventClosed } from "./EventUtils";
import SimilarEvents from "./SimilarEvents";

const EventPageContainer: React.FC<
  RouteComponentProps<{ id: string }>
> = props => {
  const eventId = props.match.params.id;
  const { data: eventData, loading } = useEventDetailsQuery({
    variables: { id: eventId }
  });

  const eventClosed = !eventData || isEventClosed(eventData.eventDetails);

  return (
    <Layout>
      <div className={styles.eventPageWrapper}>
        <LoadingSpinner isLoading={loading}>
          {eventData && (
            <>
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

export default withRouter(EventPageContainer);
