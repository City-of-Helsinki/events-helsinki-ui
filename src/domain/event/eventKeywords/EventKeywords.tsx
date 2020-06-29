import { isThisWeek, isToday } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import Keyword from "../../../common/components/keyword/Keyword";
import { DATE_TYPES } from "../../../constants";
import { EventFieldsFragment } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import scrollToTop from "../../../util/scrollToTop";
import { getSearchQuery } from "../../../util/searchUtils";
import { ROUTES } from "../../app/constants";
import { getEventKeywords, isEventFree } from "../EventUtils";

interface Props {
  blackOnMobile?: boolean;
  event: EventFieldsFragment;
  hideKeywordsOnMobile?: boolean;
  showIsFree: boolean;
  showKeywords?: boolean;
}
const EventKeywords: React.FC<Props> = ({
  blackOnMobile,
  event,
  hideKeywordsOnMobile = false,
  showIsFree,
  showKeywords = true
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const locale = useLocale();

  const startTime = event.startTime;
  const today = startTime ? isToday(new Date(startTime)) : false;
  const keywords = getEventKeywords(event, locale);

  const thisWeek = startTime ? isThisWeek(new Date(startTime)) : false;

  if (!today && !thisWeek && (!keywords || !keywords.length)) {
    return null;
  }

  const handleClick = (type: "dateType" | "isFree" | "keyword", value = "") => {
    const search = getSearchQuery({
      categories: [],
      dateTypes: type === "dateType" ? [value] : [],
      divisions: [],
      end: null,
      isFree: type === "isFree",
      keywordNot: [],
      keywords: type === "keyword" ? [value] : [],
      places: [],
      publisher: null,
      start: null,
      text: ""
    });

    history.push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
    scrollToTop();
  };

  return (
    <>
      {!!keywords.length &&
        showKeywords &&
        keywords.map(keyword => {
          return (
            <Keyword
              blackOnMobile={blackOnMobile}
              hideOnMobile={hideKeywordsOnMobile}
              key={keyword.id}
              keyword={keyword.name}
              onClick={() => handleClick("keyword", keyword.id)}
            />
          );
        })}
      {today && (
        <Keyword
          color="engelLight50"
          keyword={t("event.categories.labelToday")}
          onClick={() => handleClick("dateType", DATE_TYPES.TODAY)}
        />
      )}
      {!today && thisWeek && (
        <Keyword
          color="engelLight50"
          keyword={t("event.categories.labelThisWeek")}
          onClick={() => handleClick("dateType", DATE_TYPES.THIS_WEEK)}
        />
      )}
      {showIsFree && isEventFree(event) && (
        <Keyword
          color="tramLight20"
          keyword={t("event.categories.labelFree")}
          onClick={() => handleClick("isFree")}
        />
      )}
    </>
  );
};

export default EventKeywords;
