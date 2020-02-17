import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../common/components/button/Button";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import { EventListQuery } from "../../../generated/graphql";
import EventCard from "../EventCard";
import styles from "./eventList.module.scss";

interface Props {
  eventsData: EventListQuery;
  loading: boolean;
  onLoadMore: () => void;
}

const EventList: React.FC<Props> = ({ eventsData, loading, onLoadMore }) => {
  const { t } = useTranslation();
  const events = eventsData.eventList.data;

  return (
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
  );
};

export default EventList;
