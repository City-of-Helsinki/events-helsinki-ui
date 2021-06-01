import {
  addDays,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import capitalize from 'lodash/capitalize';

import { SUPPORT_LANGUAGES } from '../constants';
import { formatDate } from './dateUtils';
import getTimeFormat from './getTimeFormat';

/**
 * Format and localise date range to show on UI
 */
const getDateRangeStr = ({
  start,
  end,
  locale,
  includeWeekday = true,
  includeTime = false,
  timeAbbreviation = '',
}: {
  start: string;
  end?: string | null;
  locale: string;
  includeWeekday?: boolean;
  includeTime?: boolean;
  timeAbbreviation?: string;
}): string => {
  const timeZone = 'Europe/Helsinki';
  const startDate = utcToZonedTime(new Date(start), timeZone);
  const nextDay = utcToZonedTime(addDays(startDate, 1), timeZone);
  nextDay.setHours(5, 0, 0, 0);
  const weekdayFormat = locale === SUPPORT_LANGUAGES.EN ? 'eee' : 'eeeeee';
  const dateFormat = 'd.M.yyyy ';
  const timeFormat = getTimeFormat(locale);
  const weekdayStr = includeWeekday
    ? `${capitalize(formatDate(startDate, weekdayFormat, locale))} `
    : '';
  const timeAbbreviationStr = timeAbbreviation ? `${timeAbbreviation} ` : '';

  if (!end) {
    const dateStr = formatDate(startDate, dateFormat, locale);
    const timeStr = includeTime
      ? `, ${timeAbbreviationStr}${formatDate(startDate, timeFormat, locale)}`
      : '';

    return [weekdayStr, dateStr, timeStr].join('');
  } else {
    const endDate = utcToZonedTime(new Date(end), timeZone);

    if (isSameDay(startDate, endDate) || isBefore(endDate, nextDay)) {
      const weekdayStr = includeWeekday
        ? `${capitalize(formatDate(startDate, weekdayFormat, locale))} `
        : '';
      const dateStr = formatDate(startDate, dateFormat, locale);
      const startTimeStr = formatDate(startDate, timeFormat, locale);
      const endTimeStr = formatDate(endDate, timeFormat, locale);
      const timeStr = includeTime
        ? `, ${timeAbbreviationStr}${startTimeStr} – ${endTimeStr}`
        : '';

      return [weekdayStr, dateStr, timeStr].join('');
    } else if (isSameMonth(startDate, endDate)) {
      const startDateStr = formatDate(startDate, 'd');
      const endDateStr = formatDate(endDate, 'd.M.yyyy');

      return `${startDateStr} – ${endDateStr}`;
    } else if (isSameYear(startDate, endDate)) {
      const startDateStr = formatDate(startDate, 'd.M');
      const endDateStr = formatDate(endDate, 'd.M.yyyy');

      return `${startDateStr} – ${endDateStr}`;
    } else {
      const startDateStr = formatDate(startDate, 'd.M.yyyy');
      const endDateStr = formatDate(endDate, 'd.M.yyyy');

      return `${startDateStr} – ${endDateStr}`;
    }
  }
};

export default getDateRangeStr;
