import React from "react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../../generated/graphql";
import SimilarEventCard from "../../event/SimilarEventCard";
import styles from "./eventCard.module.scss";

interface Props {
  eventId: string;
}

const EventCard: React.FC<Props> = ({ eventId }) => {
  const { t } = useTranslation();
  const { data: eventData, error, loading } = useEventDetailsQuery({
    variables: {
      id: eventId
    }
  });

  return (
    <div className={styles.eventCard}>
      <LoadingSpinner isLoading={loading}>
        {eventData && <SimilarEventCard event={eventData.eventDetails} />}
        {error && <div>{t("collection.curatedEvents.textEventNotFound")}</div>}
      </LoadingSpinner>
    </div>
  );
};

export default EventCard;
