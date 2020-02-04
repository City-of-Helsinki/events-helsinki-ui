import classNames from "classnames";
import unescape from "lodash/unescape";
import React from "react";
import { useTranslation } from "react-i18next";
import sanitizeHtml from "sanitize-html";

import ShareLinks from "../../common/components/shareLinks/ShareLinks";
import { EventDetailsQuery } from "../../generated/graphql";
import useLocale from "../../hooks/useLocale";
import getLocalisedString from "../../util/getLocalisedString";
import styles from "./eventContent.module.scss";
import EventInfo from "./EventInfo";
import EventLocation from "./EventLocation";

interface Props {
  eventData: EventDetailsQuery;
}

const EventContent: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const description = eventData.eventDetails.description
    ? getLocalisedString(eventData.eventDetails.description, locale)
    : null;

  return (
    <div className={styles.eventContent}>
      <div className={styles.infoColumn}>
        <EventInfo eventData={eventData} />
      </div>
      <div className={styles.descriptionColumn}>
        {description && (
          <>
            <h3 className={styles.descriptionTitle}>
              {t("event.description.title")}
            </h3>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(unescape(description))
              }}
            />
          </>
        )}
        <ShareLinks title={t("event.shareLinks.title")} />
        <div
          className={classNames(
            styles.horizontalDivider,
            styles.largeWhiteSpace
          )}
        />
        <EventLocation eventData={eventData} />
      </div>
      {/* Dummy div to keep layout consistent with EventHero */}
      <div></div>
    </div>
  );
};

export default EventContent;
