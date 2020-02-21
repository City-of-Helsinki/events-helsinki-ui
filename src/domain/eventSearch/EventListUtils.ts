import { addDays, endOfWeek, isPast, startOfWeek, subDays } from "date-fns";

import {
  CATEGORIES,
  DATE_TYPES,
  DISTRICTS,
  TARGET_GROUPS
} from "../../constants";
import { EventListQuery } from "../../generated/graphql";
import { formatDate } from "../../util/dateUtils";
import getUrlParamAsString from "../../util/getUrlParamAsString";
import {
  CULTURE_KEYWORDS,
  EVENT_SORT_OPTIONS,
  INFLUENCE_KEYWORDS,
  MUSEUM_KEYWORDS
} from "./constants";

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
  const dateFormat = "yyyy-MM-dd";
  if (startDate || endDate) {
    return { endDate, startDate };
  }

  const today = new Date();
  const sunday = endOfWeek(today, { weekStartsOn: 1 });
  const friday = formatDate(subDays(sunday, 2), dateFormat);
  const monday = startOfWeek(today, { weekStartsOn: 1 });

  let end = "";
  let start = "";

  if (dayTypes.includes(DATE_TYPES.ALL)) {
    return { endDate: null, startDate: null };
  }

  if (dayTypes.includes(DATE_TYPES.TODAY)) {
    end = formatDate(today, dateFormat);
    start = formatDate(today, dateFormat);
  }

  if (dayTypes.includes(DATE_TYPES.TOMORROW)) {
    end = formatDate(addDays(today, 1), dateFormat);
    start = start ? start : formatDate(addDays(today, 1), dateFormat);
  }

  if (dayTypes.includes(DATE_TYPES.WEEKEND)) {
    end =
      end && end > formatDate(sunday, dateFormat)
        ? end
        : formatDate(sunday, dateFormat);
    start = start && start < friday ? start : friday;
  }

  if (dayTypes.includes(DATE_TYPES.THIS_WEEK)) {
    end =
      end && end > formatDate(sunday, dateFormat)
        ? end
        : formatDate(sunday, dateFormat);
    start = formatDate(monday, dateFormat);
  }

  return { endDate: end, startDate: start };
};

/**
 * Get current hour as string to event query
 * @return {string}
 */
const getCurrentHour = (): string => {
  const dateFormat = "yyyy-MM-dd";
  const now = new Date();
  return `${formatDate(now, dateFormat)}T${formatDate(now, "HH")}`;
};

/**
 * Get event list request filters from url parameters
 * @param params
 * @param pageSize {number}
 * @param sortOrder {string}
 * @param language {string}
 * @return {object}
 */
export const getEventFilters = (
  params: URLSearchParams,
  pageSize: number,
  sortOrder: EVENT_SORT_OPTIONS,
  language: "en" | "fi" | "sv"
) => {
  const dateFormat = "yyyy-MM-dd";
  const dateTypes = getUrlParamAsString(params, "dateTypes");
  let { startDate, endDate } = getFilterDates(
    dateTypes,
    params.get("startDate"),
    params.get("endDate")
  );

  if (!startDate || isPast(new Date(startDate))) {
    startDate = getCurrentHour();
  }
  if (endDate && isPast(new Date(endDate))) {
    endDate = formatDate(new Date(), dateFormat);
  }

  const places = getUrlParamAsString(params, "places");
  const categories = getUrlParamAsString(params, "categories");
  const districts = getUrlParamAsString(params, "districts");
  const mappedDistricts: string[] = districts.map(district => {
    switch (district) {
      case DISTRICTS.KULOSAARI:
        return "kaupunginosa:mustikkamaa-korkeasaari,kaupunginosa:kulosaari";
      case DISTRICTS.LAAJASALO:
        return "kaupunginosa:laajasalo,kaupunginosa:villinki,kaupunginosa:santahamina";
      case DISTRICTS.SUOMENLINNA:
        return "kaupunginosa:suomenlinna,kaupunginosa:ulkosaaret";
      case DISTRICTS.ÖSTERSUNDOM:
        // eslint-disable-next-line max-len
        return "kaupunginosa:östersundom,kaupunginosa:salmenkallio,kaupunginosa:talosaari,kaupunginosa:karhusaari,kaupunginosa:ultuna";
      default:
        return district;
    }
  });
  // Get only events in Helsinki
  if (!mappedDistricts.length) {
    mappedDistricts.push("kunta:helsinki");
  }

  const keywords = getUrlParamAsString(params, "keywords");
  const mappedCategories: string[] = categories.map(category => {
    switch (category) {
      case CATEGORIES.CULTURE:
        return CULTURE_KEYWORDS.join(",");
      case CATEGORIES.DANCE:
        return "yso:p1278";
      case CATEGORIES.FOOD:
        return "yso:p3670";
      case CATEGORIES.INFLUENCE:
        return INFLUENCE_KEYWORDS.join(",");
      case CATEGORIES.MISC:
        return "yso:p2108";
      case CATEGORIES.MOVIE:
        return "yso:p1235";
      case CATEGORIES.MUSEUM:
        return MUSEUM_KEYWORDS.join(",");
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
    divisions: mappedDistricts.sort(),
    endDate: endDate,
    keywords: mappedCategories.sort(),
    language,
    locations: places.sort(),
    pageSize,
    publisher: params.get("publisher"),
    sort: sortOrder,
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
