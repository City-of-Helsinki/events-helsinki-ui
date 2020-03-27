import React from "react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import {
  CollectionDetailsQuery,
  useEventsByIdsQuery
} from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import Container from "../../app/layout/Container";
import { getEventIdFromUrl, isEventClosed } from "../../event/EventUtils";
import styles from "./curatedEventList.module.scss";
import EventCards from "./EventCards";

const PAST_EVENTS_DEFAULT_SIZE = 4;

interface Props {
  collectionData: CollectionDetailsQuery;
}

const CuratedEventList: React.FC<Props> = ({ collectionData }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [showAllPastEvents, setShowAllPastEvents] = React.useState(false);
  const eventIds = React.useMemo(
    () =>
      collectionData.collectionDetails.curatedEvents
        .map(url => getEventIdFromUrl(url) || "")
        .filter(e => e),
    [collectionData.collectionDetails.curatedEvents]
  );

  const { data: eventsData, loading } = useEventsByIdsQuery({
    variables: { ids: eventIds, include: ["keywords", "location"] }
  });

  const events = eventsData
    ? eventsData.eventsByIds.filter(event => !isEventClosed(event))
    : [];

  const pastEvents = eventsData
    ? eventsData.eventsByIds.filter(event => isEventClosed(event))
    : [];

  const handleShowAllPastEvents = () => {
    setShowAllPastEvents(true);
  };

  return (
    <LoadingSpinner isLoading={loading}>
      {!!eventsData && (
        <div className={styles.curatedEventList}>
          <Container>
            <div className={styles.contentWrapper}>
              <h2>
                {getLocalisedString(
                  collectionData.collectionDetails.curatedEventsTitle,
                  locale
                )}
              </h2>
              <EventCards events={events} />
              <h2 className={styles.titlePastRecommendations}>
                {t("collection.titlePastRecommendations")}
              </h2>
              <EventCards
                events={pastEvents.slice(
                  0,
                  showAllPastEvents ? undefined : PAST_EVENTS_DEFAULT_SIZE
                )}
                onShowMore={handleShowAllPastEvents}
                showMoreButton={
                  !showAllPastEvents &&
                  pastEvents.length > PAST_EVENTS_DEFAULT_SIZE
                }
              />
            </div>
          </Container>
        </div>
      )}
    </LoadingSpinner>
  );
};

export default CuratedEventList;
