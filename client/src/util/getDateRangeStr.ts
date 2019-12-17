import { isSameDay, isSameMonth, isSameYear } from "date-fns";
import capitalize from "lodash/capitalize";

import { formatDate } from "./dateUtils";

/**
 * Format and localise date range to show on UI
 */
export default (
  start: string,
  end: string | null | undefined,
  locale: string,
  includeWeekday = true
) => {
  const dateFormat = "d. MMMM yyyy ";

  if (!end) {
    return `${
      includeWeekday
        ? `${capitalize(formatDate(new Date(start), "cccc", locale))}`
        : ""
    } ${formatDate(new Date(start), dateFormat, locale)}`;
  } else {
    if (isSameDay(new Date(start), new Date(end))) {
      return `${
        includeWeekday
          ? `${capitalize(formatDate(new Date(start), "cccc", locale))}`
          : ""
      } ${formatDate(new Date(start), dateFormat, locale)}`;
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