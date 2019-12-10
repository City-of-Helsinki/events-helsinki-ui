import React from "react";
import { useTranslation } from "react-i18next";

import { EventListQuery } from "../../generated/graphql";
import Container from "../app/layout/Container";
import EventCard from "./EventCard";
import styles from "./searchResultList.module.scss";

interface Props {
  eventsData: EventListQuery;
}

const SearchResultList: React.FC<Props> = ({ eventsData }) => {
  const { t } = useTranslation();
  const events = eventsData.eventList.data;
  return (
    <div className={styles.searchResultListContainer}>
      <Container>
        <div className={styles.count}>
          {t("eventSearch.textFoundEvents", {
            count: eventsData.eventList.meta.count
          })}
        </div>
        <div className={styles.searchResultWrapper}>
          <div className={styles.filtersWrapper}>
            <h4 className={styles.titleFilterSummary}>
              {t("eventSearch.filters.titleSummary")}
            </h4>
            {/* TODO: Add filters summary here */}
            TODO: Filter criteria summary
          </div>
          <div className={styles.eventListWrapper}>
            {events.map(event => {
              return <EventCard key={event.id} event={event} />;
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchResultList;
