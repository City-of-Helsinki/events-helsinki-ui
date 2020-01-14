import { addDays, endOfWeek, startOfWeek, subDays } from "date-fns";

import { CATEGORIES, DATE_TYPES, TARGET_GROUPS } from "../../constants";
import { EventListQuery } from "../../generated/graphql";
import { formatDate } from "../../util/dateUtils";
import getUrlParamAsString from "../../util/getUrlParamAsString";

/**
 * Get start and end dates to event list filtering
 * @param dayTypes
 * @param startDate
 * @param endDate
 * @return {object}
 */
const getFilterDates = (
  dayTypes: string[],
  startDate: string | null,
  endDate: string | null
) => {
  if (startDate || endDate) {
    return { endDate, startDate };
  }

  const today = new Date();
  const sunday = endOfWeek(today, { weekStartsOn: 1 });
  const friday = formatDate(subDays(sunday, 2));
  const monday = startOfWeek(today, { weekStartsOn: 1 });

  let end = "";
  let start = "";

  if (dayTypes.includes(DATE_TYPES.ALL)) {
    return { endDate: null, startDate: null };
  }

  if (dayTypes.includes(DATE_TYPES.TODAY)) {
    end = formatDate(today);
    start = formatDate(today);
  }

  if (dayTypes.includes(DATE_TYPES.TOMORROW)) {
    end = formatDate(addDays(today, 1));
    start = start ? start : formatDate(addDays(today, 1));
  }

  if (dayTypes.includes(DATE_TYPES.WEEKEND)) {
    end = end && end > formatDate(sunday) ? end : formatDate(sunday);
    start = start && start < friday ? start : friday;
  }

  if (dayTypes.includes(DATE_TYPES.THIS_WEEK)) {
    end = end && end > formatDate(sunday) ? end : formatDate(sunday);
    start = formatDate(monday);
  }

  return { endDate: end, startDate: start };
};

/**
 * Get event list request filters from url parameters
 * @param params
 * @param pageSize {number}
 * @return {object}
 */
export const getEventFilters = (params: URLSearchParams, pageSize: number) => {
  const dateTypes = getUrlParamAsString(params, "dateTypes");
  const { startDate, endDate } = getFilterDates(
    dateTypes,
    params.get("startDate"),
    params.get("endDate")
  );
  const places = getUrlParamAsString(params, "places");

  const categories = getUrlParamAsString(params, "categories");
  const districts = getUrlParamAsString(params, "districts");
  const keywords = getUrlParamAsString(params, "keywords");
  const mappedCategories: string[] = categories.map(category => {
    switch (category) {
      case CATEGORIES.CULTURE:
        return "yso:p360";
      case CATEGORIES.DANCE:
        return "yso:p1278";
      case CATEGORIES.FOOD:
        return "yso:p3670";
      case CATEGORIES.INFLUENCE:
        return "yso:p1657";
      case CATEGORIES.MISC:
        return "yso:p2108";
      case CATEGORIES.MOVIE:
        return "yso:p1235";
      case CATEGORIES.MUSEUM:
        return "yso:p4934";
      case CATEGORIES.MUSIC:
        return "yso:p1808";
      case CATEGORIES.NATURE:
        return "yso:p2771";
      case CATEGORIES.SPORT:
        return "yso:p965";
      case CATEGORIES.THEATRE:
        return "yso:p2625";
      default:
        return "";
    }
  });
  mappedCategories.push(...keywords);
  const targets = getUrlParamAsString(params, "targets");
  const mappedTargets: string[] = targets.map(target => {
    switch (target) {
      case TARGET_GROUPS.CHILDREN:
        return "yso:p4354";
      case TARGET_GROUPS.YOUNG_PEOPLE:
        return "yso:p11617";
      default:
        return "";
    }
  });

  mappedCategories.push(...mappedTargets);

  return {
    divisions: districts,
    endDate: endDate,
    keywords: mappedCategories,
    locations: places,
    pageSize,
    publisher: params.get("publisher"),
    startDate: startDate,
    text: params.get("search")
  };
};

/**
 * Get next page number from linkedevents api response
 * @param eventsData
 * @return {number}
 */
export const getNextPage = (
  eventsData: EventListQuery | undefined
): number | null => {
  if (!eventsData || !eventsData.eventList.meta.next) return null;

  const urlParts = eventsData.eventList.meta.next.split("?");
  const searchParams = new URLSearchParams(decodeURIComponent(urlParts[1]));
  const page = searchParams.get("page");
  return page ? Number(page) : null;
};
