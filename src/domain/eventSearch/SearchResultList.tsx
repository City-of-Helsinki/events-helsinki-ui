import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../common/components/button/Button";
import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import { EventListQuery } from "../../generated/graphql";
import isClient from "../../util/isClient";
import Container from "../app/layout/Container";
import EventCard from "./EventCard";
import FilterSummary from "./FilterSummary";
import styles from "./searchResultList.module.scss";

interface Props {
  eventsData: EventListQuery;
  loading: boolean;
  onLoadMore: () => void;
  showCount?: boolean;
  showFilterSummary?: boolean;
}

const SearchResultList: React.FC<Props> = ({
  eventsData,
  loading,
  onLoadMore,
  showCount = true,
  showFilterSummary = true
}) => {
  const { t } = useTranslation();
  const events = eventsData.eventList.data;

  React.useEffect(() => {
    // Scroll to top when page loads. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={styles.searchResultListContainer}>
      <Container>
        {showCount && (
          <div className={styles.count}>
            {t("eventSearch.textFoundEvents", {
              count: eventsData.eventList.meta.count
            })}
          </div>
        )}

        <div
          className={classNames(styles.searchResultWrapper, {
            [styles.hasFilterSummary]: showFilterSummary
          })}
        >
          {showFilterSummary && <FilterSummary />}
          <div className={styles.eventListWrapper}>
            {events.map(event => {
              return <EventCard key={event.id} event={event} />;
            })}
            <div className={styles.loadMoreWrapper}>
              <LoadingSpinner isLoading={loading}>
                {!!eventsData.eventList.meta.next && (
                  <Button color="primary" size="default" onClick={onLoadMore}>
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
