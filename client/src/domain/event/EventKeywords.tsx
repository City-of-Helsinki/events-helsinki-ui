import { isThisWeek, isToday } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

import Keyword from "../../common/components/keyword/Keyword";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import { isEventFree } from "./EventUtils";
import { EventInList } from "./types";

interface Props {
  blackOnMobile?: boolean;
  event: EventInList;
  showIsFree: boolean;
}
const EventKeywords: React.FC<Props> = ({
  blackOnMobile,
  event,
  showIsFree
}) => {
  const { t } = useTranslation();
  const locale = getLocale();

  const startTime = event.startTime;
  const today = startTime ? isToday(new Date(startTime)) : false;
  const keywords = event.keywords;
  const thisWeek = startTime ? isThisWeek(new Date(startTime)) : false;
  if (!today && !thisWeek && (!keywords || !keywords.length)) {
    return null;
  }

  return (
    <div>
      {keywords &&
        keywords.map(keyword => {
          return (
            <Keyword
              blackOnMobile={blackOnMobile}
              key={keyword.id}
              keyword={getLocalisedString(keyword.name, locale)}
            />
          );
        })}
      {!today && !thisWeek && (
        <Keyword
          color="engelLight50"
          keyword={t("event.categories.labelToday")}
        />
      )}
      {!today && thisWeek && (
        <Keyword
          color="engelLight50"
          keyword={t("event.categories.labelThisWeek")}
        />
      )}
      {showIsFree && isEventFree(event) && (
        <Keyword
          color="tramLight20"
          keyword={t("event.categories.labelFree")}
        />
      )}
    </div>
  );
};

export default EventKeywords;
