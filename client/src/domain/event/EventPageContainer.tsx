import React from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../generated/graphql";
import isClient from "../../util/isClient";
import Container from "../app/layout/Container";
import Layout from "../app/layout/Layout";
import EventContent from "./EventContent";
import EventHero from "./EventHero";
import styles from "./eventPage.module.scss";
import SimilarEvents from "./SimilarEvents";

const EventPageContainer: React.FC<
  RouteComponentProps<{ id: string }>
> = props => {
  const { pathname } = useLocation();
  const eventId = props.match.params.id;
  const { data: eventData, loading } = useEventDetailsQuery({
    variables: { id: eventId }
  });

  React.useEffect(() => {
    // Scroll to top when event changes. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <Layout>
      <div className={styles.eventPageWrapper}>
        <LoadingSpinner isLoading={loading}>
          {eventData && (
            <>
              <EventHero eventData={eventData} />
              <Container>
                <EventContent eventData={eventData} />
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
