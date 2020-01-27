import React from "react";

import EventCard from "./EventCard";
import styles from "./eventCards.module.scss";

interface Props {
  eventIds: Array<string | null>;
}

const SimilarEvents: React.FC<Props> = ({ eventIds }) => {
  return (
    <div className={styles.eventCards}>
      {eventIds.map(
        eventId => eventId && <EventCard key={eventId} eventId={eventId} />
      )}
    </div>
  );
};

export default SimilarEvents;
