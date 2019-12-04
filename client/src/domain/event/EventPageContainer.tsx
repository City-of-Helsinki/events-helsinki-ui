import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import Map from "../../common/components/map/Map";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import {
  EventDetailsQuery,
  useEventDetailsQuery
} from "../../generated/graphql";
import Layout from "../app/layout/Layout";
import EventHero from "./EventHero";
import styles from "./eventPage.module.scss";

const EventPageContainer: React.FC<
  RouteComponentProps<{ id: string }>
> = props => {
  const eventId = props.match.params.id;
  const { data: eventData, loading } = useEventDetailsQuery({
    variables: { id: eventId }
  });

  const renderEventPage = (data: EventDetailsQuery) => {
    const coordinates =
      data.linkedEventsEventDetails.location &&
      data.linkedEventsEventDetails.location.position &&
      data.linkedEventsEventDetails.location &&
      data.linkedEventsEventDetails.location.position.coordinates
        ? data.linkedEventsEventDetails.location.position.coordinates
        : null;
    return (
      <>
        <EventHero eventData={data} />
        <Map coordinates={coordinates} />
      </>
    );
  };

  return (
    <Layout>
      <div className={styles.eventPageWrapper}>
        <LoadingSpinner isLoading={loading}>
          {eventData && renderEventPage(eventData)}
        </LoadingSpinner>
      </div>
    </Layout>
  );
};

export default withRouter(EventPageContainer);
