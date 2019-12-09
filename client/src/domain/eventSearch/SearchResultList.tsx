import React from "react";
import { useTranslation } from "react-i18next";

import { EventListQuery } from "../../generated/graphql";
import Container from "../app/layout/Container";
import styles from "./searchResultList.module.scss";

interface Props {
  eventsData: EventListQuery;
}

const SearchResultList: React.FC<Props> = ({ eventsData }) => {
  const { t } = useTranslation();
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
          <div className={styles.eventListWrapper}></div>
        </div>
      </Container>
    </div>
  );
};

export default SearchResultList;
