import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

import ErrorHero from "../../common/components/error/ErrorHero";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import isClient from "../../util/isClient";
import Container from "../app/layout/Container";
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
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const params = useParams<RouteParams>();
  const eventId = params.id;
  const locale = useLocale();

  const { data: eventData, loading } = useEventDetailsQuery({
    variables: { id: eventId, include: ["in_language", "keywords", "location"] }
  });

  React.useEffect(() => {
    // Scroll to top when event changes. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const eventClosed = !eventData || isEventClosed(eventData.eventDetails);

  return (
    <div className={styles.eventPageWrapper}>
      <LoadingSpinner isLoading={loading}>
        {eventData ? (
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
        ) : (
          <ErrorHero
            text={t("event.notFound.text")}
            title={t("event.notFound.title")}
          >
            <Link to={`/${locale}/events${search}`}>
              {t("event.notFound.linkSearchEvents")}
            </Link>
          </ErrorHero>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default EventPageContainer;
