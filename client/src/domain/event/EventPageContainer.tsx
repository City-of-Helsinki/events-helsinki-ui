import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../generated/graphql";
import Container from "../app/layout/Container";
import Layout from "../app/layout/Layout";
import EventContent from "./EventContent";
import EventHero from "./EventHero";
import styles from "./eventPage.module.scss";

const EventPageContainer: React.FC<
  RouteComponentProps<{ id: string }>
> = props => {
  const eventId = props.match.params.id;
  const { data: eventData, loading } = useEventDetailsQuery({
    variables: { id: eventId }
  });

  return (
    <Layout>
      <div className={styles.eventPageWrapper}>
        <LoadingSpinner isLoading={loading}>
          {eventData && (
            <>
              <EventHero eventData={eventData} />
              <Container>
                <EventContent eventData={eventData} />
              </Container>
            </>
          )}
        </LoadingSpinner>
      </div>
    </Layout>
  );
};

export default withRouter(EventPageContainer);
