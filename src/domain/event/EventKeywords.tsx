import { isThisWeek, isToday } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

import Keyword from "../../common/components/keyword/Keyword";
import useLocale from "../../hooks/useLocale";
import { getEventKeywords, isEventFree } from "./EventUtils";
import { EventInList } from "./types";

interface Props {
  blackOnMobile?: boolean;
  event: EventInList;
  showIsFree: boolean;
  showKeywords?: boolean;
}
const EventKeywords: React.FC<Props> = ({
  blackOnMobile,
  event,
  showIsFree,
  showKeywords = true
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const startTime = event.startTime;
  const today = startTime ? isToday(new Date(startTime)) : false;
  const keywords = getEventKeywords(event, locale);

  const thisWeek = startTime ? isThisWeek(new Date(startTime)) : false;

  if (!today && !thisWeek && (!keywords || !keywords.length)) {
    return null;
  }

  return (
    <div>
      {!!keywords.length &&
        showKeywords &&
        keywords.map(keyword => {
          return (
            <Keyword
              blackOnMobile={blackOnMobile}
              key={keyword.id}
              keyword={keyword.name}
            />
          );
        })}
      {today && (
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
