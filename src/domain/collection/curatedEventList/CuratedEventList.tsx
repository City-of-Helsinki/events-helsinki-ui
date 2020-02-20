import React from "react";

import { CollectionDetailsQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import Container from "../../app/layout/Container";
import { getEventIdFromUrl } from "../collectionUtils/CollectionUtils";
import styles from "./curatedEventList.module.scss";
import EventCards from "./EventCards";

interface Props {
  collectionData: CollectionDetailsQuery;
}

const CuratedEventList: React.FC<Props> = ({ collectionData }) => {
  const locale = useLocale();
  const eventIds = React.useMemo(
    () =>
      collectionData.collectionDetails.curatedEvents
        .map(url => getEventIdFromUrl(url))
        .filter(e => e),
    [collectionData.collectionDetails.curatedEvents]
  );

  return (
    <div className={styles.curatedEventList}>
      <Container>
        <div className={styles.contentWrapper}>
          <h2>
            {getLocalisedString(
              collectionData.collectionDetails.curatedEventsTitle,
              locale
            )}
          </h2>
          <EventCards eventIds={eventIds} />
        </div>
      </Container>
    </div>
  );
};

export default CuratedEventList;
