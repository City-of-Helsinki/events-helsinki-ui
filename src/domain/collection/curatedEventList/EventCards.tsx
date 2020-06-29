import { Button } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";

import LargeEventCard from "../../../common/components/eventCard/LargeEventCard";
import { EventFieldsFragment } from "../../../generated/graphql";
import styles from "./eventCards.module.scss";

interface Props {
  events: Array<EventFieldsFragment>;
  onShowMore?: () => void;
  showMoreButton?: boolean;
}

const EventCards: React.FC<Props> = ({
  events,
  onShowMore,
  showMoreButton
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.eventCards}>
        {events.map(
          (event, id) => event && <LargeEventCard key={id} event={event} />
        )}
      </div>
      {showMoreButton && (
        <div className={styles.loadMoreWrapper}>
          <Button onClick={onShowMore} variant="success">
            {t("collection.buttonShowAllPastEvents")}
          </Button>
        </div>
      )}
    </>
  );
};

export default EventCards;
