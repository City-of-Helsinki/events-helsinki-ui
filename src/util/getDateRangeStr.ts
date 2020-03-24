import {
  addDays,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear
} from "date-fns";
import capitalize from "lodash/capitalize";

import { SUPPORT_LANGUAGES } from "../constants";
import { formatDate } from "./dateUtils";
import getTimeFormat from "./getTimeFormat";

/**
 * Format and localise date range to show on UI
 */
export default (
  start: string,
  end: string | null | undefined,
  locale: string,
  includeWeekday = true,
  includeTime = false,
  timeAbbreviation = ""
) => {
  const startDate = new Date(start);
  const nextDay = addDays(startDate, 1);
  nextDay.setHours(5, 0, 0, 0);
  const weekdayFormat = locale === SUPPORT_LANGUAGES.EN ? "eee" : "eeeeee";
  const dateFormat = "d.M.yyyy ";
  const timeFormat = getTimeFormat(locale);

  if (!end) {
    return `${
      includeWeekday
        ? `${capitalize(formatDate(startDate, weekdayFormat, locale))} `
        : ""
    }${formatDate(startDate, dateFormat, locale)}${
      includeTime
        ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ""}${formatDate(
            startDate,
            timeFormat,
            locale
          )}`
        : ""
    }`;
  } else {
    const endDate = new Date(end);

    if (isSameDay(startDate, endDate) || isBefore(endDate, nextDay)) {
      return `${
        includeWeekday
          ? `${capitalize(formatDate(startDate, weekdayFormat, locale))} `
          : ""
      }${formatDate(startDate, dateFormat, locale)}${
        includeTime
          ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ""}${formatDate(
              startDate,
              timeFormat,
              locale
            )} – ${formatDate(endDate, timeFormat, locale)}`
          : ""
      }`;
    } else if (isSameDay(nextDay, endDate)) {
      return `${formatDate(startDate, dateFormat, locale)}${
        includeTime
          ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ""}${formatDate(
              startDate,
              timeFormat,
              locale
            )}`
          : ""
      } – ${formatDate(endDate, dateFormat, locale)}${
        includeTime
          ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ""}${formatDate(
              endDate,
              timeFormat,
              locale
            )}`
          : ""
      }`;
    } else if (isSameMonth(new Date(start), new Date(end))) {
      return `${formatDate(new Date(start), "d")} – ${formatDate(
        new Date(end),
        "d.M.yyyy"
      )}`;
    } else if (isSameYear(new Date(start), new Date(end))) {
      return `${formatDate(new Date(start), "d.M")} – ${formatDate(
        new Date(end),
        "d.M.yyyy"
      )}`;
    } else {
      return `${formatDate(new Date(start), "d.M.yyyy")} – ${formatDate(
        new Date(end),
        "d.M.yyyy"
      )}`;
    }
  }
};
