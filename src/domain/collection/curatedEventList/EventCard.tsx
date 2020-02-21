import classNames from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import LargeEventCard from "../../../common/components/eventCard/LargeEventCard";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import { useEventDetailsQuery } from "../../../generated/graphql";
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
    <div
      className={classNames(styles.eventCard, { [styles.isLoading]: loading })}
    >
      <LoadingSpinner isLoading={loading}>
        {!!eventData && <LargeEventCard event={eventData.eventDetails} />}
        {error && <div>{t("collection.curatedEvents.textEventNotFound")}</div>}
      </LoadingSpinner>
    </div>
  );
};

export default EventCard;
