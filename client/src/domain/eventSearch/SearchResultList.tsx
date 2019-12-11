import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../common/components/button/Button";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { EventListQuery } from "../../generated/graphql";
import Container from "../app/layout/Container";
import EventCard from "./EventCard";
import styles from "./searchResultList.module.scss";

interface Props {
  eventsData: EventListQuery;
  loading: boolean;
  onLoadMore: () => void;
}

const SearchResultList: React.FC<Props> = ({
  eventsData,
  loading,
  onLoadMore
}) => {
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
          <div className={styles.filtersContainer}>
            <div className={styles.filtersWrapper}>
              <h4 className={styles.titleFilterSummary}>
                {t("eventSearch.filters.titleSummary")}
              </h4>
              {/* TODO: Add filters summary here */}
              TODO: Filter criteria summary
            </div>
            <div className={styles.filtersWrapper}>
              <h4 className={styles.titleFilterSummary}>
                {t("eventSearch.filters.titleSummary")}
              </h4>
              {/* TODO: Add filters summary here */}
              TODO: Filter criteria summary
            </div>
          </div>
          <div className={styles.eventListWrapper}>
            {events.map(event => {
              return <EventCard key={event.id} event={event} />;
            })}
            <div className={styles.loadMoreWrapper}>
              <LoadingSpinner isLoading={loading}>
                {!!eventsData.eventList.meta.next && (
                  <Button color="primary" size="sm" onClick={onLoadMore}>
                    {t("eventSearch.buttonLoadMore")}
                  </Button>
                )}
              </LoadingSpinner>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchResultList;
