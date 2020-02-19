import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { EventListQuery } from "../../../generated/graphql";
import isClient from "../../../util/isClient";
import Container from "../../app/layout/Container";
import EventList from "./EventList";
import FilterSummary from "./FilterSummary";
import NoResultsInfo from "./NoResultsInfo";
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
  onLoadMore
}) => {
  const { t } = useTranslation();
  const count = eventsData.eventList.meta.count;

  React.useEffect(() => {
    // Scroll to top when page loads. Ignore this on SSR because window doesn't exist
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={styles.searchResultListContainer}>
      <Container>
        <div className={classNames(styles.searchResultWrapper)}>
          <div>
            <FilterSummary />
          </div>
          <div>
            <div className={styles.count}>
              {t("eventSearch.textFoundEvents", {
                count
              })}
            </div>
            {!count && !loading && <NoResultsInfo />}
            <EventList
              eventsData={eventsData}
              loading={loading}
              onLoadMore={onLoadMore}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchResultList;
