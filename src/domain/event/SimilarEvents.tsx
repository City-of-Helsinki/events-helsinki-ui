import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import SimilarEventCard from "../../common/components/eventCard/EventCard";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { EventDetailsQuery, useEventListQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import isClient from "../../util/isClient";
import { getSearchQuery } from "../../util/searchUtils";
// Use same page size as on event search page
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "../eventSearch/constants";
import { getEventFilters } from "../eventSearch/EventListUtils";
import { SIMILAR_EVENTS_AMOUNT } from "./constants";
import styles from "./similarEvents.module.scss";

interface Props {
  eventData: EventDetailsQuery;
}

const SimilarEvents: React.FC<Props> = ({ eventData }) => {
  const locale = useLocale();
  const { search } = useLocation();
  const eventSearch = getSearchQuery({
    categories: [],
    dateTypes: [],
    districts: [],
    endDate: null,
    isCustomDate: false,
    keywords: eventData.eventDetails.keywords.map(keyword => keyword.id),
    places: [],
    publisher: null,
    search: "",
    startDate: null,
    targets: []
  });
  // Filter by search query if exists, if not filter by event keywords
  const searchParams = new URLSearchParams(search ? search : eventSearch);
  const eventFilters = React.useMemo(() => {
    return getEventFilters(
      searchParams,
      PAGE_SIZE,
      EVENT_SORT_OPTIONS.START_TIME,
      locale
    );
  }, [locale, searchParams]);
  const { t } = useTranslation();

  const { data: eventsData, loading } = useEventListQuery({
    skip: !isClient,
    variables: eventFilters
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
