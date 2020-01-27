import React from "react";

import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../../generated/graphql";
import SimilarEventCard from "../../event/SimilarEventCard";
import styles from "./eventCard.module.scss";

interface Props {
  eventId: string;
}

const EventCard: React.FC<Props> = ({ eventId }) => {
  const { data: eventData, loading } = useEventDetailsQuery({
    variables: {
      id: eventId
    }
  });

  return (
    <div className={styles.eventCard}>
      <LoadingSpinner isLoading={loading}>
        {eventData && <SimilarEventCard event={eventData.eventDetails} />}
      </LoadingSpinner>
    </div>
  );
};

export default EventCard;
