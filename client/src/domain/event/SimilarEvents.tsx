import React from "react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { EventDetailsQuery, useEventListQuery } from "../../generated/graphql";
import isClient from "../../util/isClient";
// Use same page size as on event search page
import { PAGE_SIZE } from "../eventSearch/constants";
import { SIMILAR_EVENTS_AMOUNT } from "./constants";
import SimilarEventCard from "./SimilarEventCard";
import styles from "./similarEvents.module.scss";

interface Props {
  // TODO: Use event data to get similar events when filtering is implemented to GraphQL proxy
  eventData: EventDetailsQuery;
}

const SimilarEvents: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();

  // TODO: Filter these results when filtering is implemented to GraphQL proxy
  // Use url search params in case that coming from
  // search page and eventData values in case that search params are missing
  const { data: eventsData, loading } = useEventListQuery({
    skip: !isClient,
    variables: { pageSize: PAGE_SIZE }
  });

  // To display only certain amount of events.
  // Always fetch data by using same page size to get events from cache
  const events =
    eventsData && !!eventsData.eventList.data.length
      ? eventsData.eventList.data
          // Don't show current event on the list
          .filter(event => event.id !== eventData.eventDetails.id)
          .slice(0, SIMILAR_EVENTS_AMOUNT)
      : [];

  return (
    <div className={styles.similarEvents}>
      <LoadingSpinner isLoading={loading}>
        {!!events.length && (
          <>
            <h3 className={styles.similarEventsTitle}>
              {t("event.similarEvents.title")}
            </h3>
            <div className={styles.similarEventList}>
              {events.map(event => {
                return <SimilarEventCard key={event.id} event={event} />;
              })}
            </div>
          </>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default SimilarEvents;
