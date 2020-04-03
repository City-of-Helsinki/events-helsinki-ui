import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../common/components/button/Button";
import EventCard from "../../../common/components/eventCard/EventCard";
import LargeEventCard from "../../../common/components/eventCard/LargeEventCard";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import { EventListQuery } from "../../../generated/graphql";
import styles from "./eventList.module.scss";

interface Props {
  buttonCentered?: boolean;
  cardSize?: "default" | "large";
  eventsData: EventListQuery;
  loading: boolean;
  onLoadMore: () => void;
}

const EventList: React.FC<Props> = ({
  buttonCentered = false,
  cardSize = "default",
  eventsData,
  loading,
  onLoadMore
}) => {
  const { t } = useTranslation();
  const events = eventsData.eventList.data;

  return (
    <div className={classNames(styles.eventListWrapper, styles[cardSize])}>
      <div className={styles.eventsWrapper}>
        {events.map(event => {
          switch (cardSize) {
            case "default":
              return <EventCard key={event.id} event={event} />;
            case "large":
            default:
              return <LargeEventCard key={event.id} event={event} />;
          }
        })}
      </div>
      <div
        className={classNames(styles.loadMoreWrapper, {
          [styles.buttonCentered]: buttonCentered
        })}
      >
        <LoadingSpinner hasPadding={!events.length} isLoading={loading}>
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
