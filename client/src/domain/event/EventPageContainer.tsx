import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { useEventDetailsQuery } from "../../generated/graphql";
import Layout from "../app/layout/Layout";
import EventHero from "./EventHero";

const EventPageContainer: React.FC<
  RouteComponentProps<{ id: string }>
> = props => {
  const eventId = props.match.params.id;
  const { data: eventData, loading } = useEventDetailsQuery({
    variables: { id: eventId }
  });

  return (
    <Layout>
      {eventData && (
        <>
          <EventHero eventData={eventData} />
        </>
      )}
      {loading && "LADATAAN..."}
    </Layout>
  );
};

export default withRouter(EventPageContainer);
