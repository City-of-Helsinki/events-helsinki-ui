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
export default (
  start: string,
  end: string | null | undefined,
  locale: string,
  includeWeekday = true,
  includeTime = false,
  timeAbbreviation = ''
): string => {
  const timeZone = 'Europe/Helsinki';
  const startDate = utcToZonedTime(new Date(start), timeZone);
  const nextDay = utcToZonedTime(addDays(startDate, 1), timeZone);
  nextDay.setHours(5, 0, 0, 0);
  const weekdayFormat = locale === SUPPORT_LANGUAGES.EN ? 'eee' : 'eeeeee';
  const dateFormat = 'd.M.yyyy ';
  const timeFormat = getTimeFormat(locale);

  if (!end) {
    return `${
      includeWeekday
        ? `${capitalize(formatDate(startDate, weekdayFormat, locale))} `
        : ''
    }${formatDate(startDate, dateFormat, locale)}${
      includeTime
        ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ''}${formatDate(
            startDate,
            timeFormat,
            locale
          )}`
        : ''
    }`;
  } else {
    const endDate = utcToZonedTime(new Date(end), timeZone);

    if (isSameDay(startDate, endDate) || isBefore(endDate, nextDay)) {
      return `${
        includeWeekday
          ? `${capitalize(formatDate(startDate, weekdayFormat, locale))} `
          : ''
      }${formatDate(startDate, dateFormat, locale)}${
        includeTime
          ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ''}${formatDate(
              startDate,
              timeFormat,
              locale
            )} – ${formatDate(endDate, timeFormat, locale)}`
          : ''
      }`;
    } else if (isSameDay(nextDay, endDate)) {
      return `${formatDate(startDate, dateFormat, locale)}${
        includeTime
          ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ''}${formatDate(
              startDate,
              timeFormat,
              locale
            )}`
          : ''
      } – ${formatDate(endDate, dateFormat, locale)}${
        includeTime
          ? `, ${timeAbbreviation ? `${timeAbbreviation} ` : ''}${formatDate(
              endDate,
              timeFormat,
              locale
            )}`
          : ''
      }`;
    } else if (isSameMonth(startDate, endDate)) {
      return `${formatDate(startDate, 'd')} – ${formatDate(
        endDate,
        'd.M.yyyy'
      )}`;
    } else if (isSameYear(startDate, endDate)) {
      return `${formatDate(startDate, 'd.M')} – ${formatDate(
        endDate,
        'd.M.yyyy'
      )}`;
    } else {
      return `${formatDate(startDate, 'd.M.yyyy')} – ${formatDate(
        endDate,
        'd.M.yyyy'
      )}`;
    }
  }
};
