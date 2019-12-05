import React from "react";
import { useTranslation } from "react-i18next";

import { EventDetailsQuery } from "../../generated/graphql";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import styles from "./eventContent.module.scss";
import EventLocation from "./EventLocation";

interface Props {
  eventData: EventDetailsQuery;
}

const EventContent: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = getLocale();
  const description = eventData.linkedEventsEventDetails.description || {};

  return (
    <div className={styles.eventContent}>
      <div className={styles.infoColumn}></div>
      <div className={styles.descriptionColumn}>
        <h3 className={styles.descriptionTitle}>
          {t("event.description.title")}
        </h3>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: getLocalisedString(description, locale)
          }}
        />
        <EventLocation eventData={eventData} />
      </div>
      {/* Dummy div to keep layout consistent with EventHero */}
      <div></div>
    </div>
  );
};

export default EventContent;
