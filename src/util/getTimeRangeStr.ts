import { isSameDay } from "date-fns";

import { formatDate } from "./dateUtils";
import getTimeFormat from "./getTimeFormat";

/**
 * Get localised time range string
 */
export default (
  start: string,
  end: string | null | undefined,
  locale: string
) => {
  const timeFormat = getTimeFormat(locale);

  if (end && isSameDay(new Date(start), new Date(end))) {
    return `${formatDate(new Date(start), timeFormat, locale)} – ${formatDate(
      new Date(end),
      timeFormat,
      locale
    )}`;
  } else {
    return formatDate(new Date(start), timeFormat, locale);
  }
};
