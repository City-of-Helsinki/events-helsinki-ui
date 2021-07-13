import { format as formatDateStr } from 'date-fns';
import isAfter from 'date-fns/isAfter';
import isValid from 'date-fns/isValid';
import { enGB as en, fi } from 'date-fns/locale';
import parse from 'date-fns/parse';
import get from 'lodash/get';

import sv from './date-fns/locale/sv';

const locales = { en, fi, sv };

export const formatDate = (
  date: Date | number | null,
  format = 'd.M.yyyy',
  locale = 'fi'
): string => {
  if (!date) {
    return '';
  }

  return formatDateStr(date, format, {
    locale: get(locales, locale),
  }).trim();
};

export const isValidDateString = (date: string) => {
  return isValidDate(parse(date, 'd.M.yyyy', new Date()));
};

export const parseDate = (date: string) => {
  return parse(date, 'd.M.yyyy', new Date());
};

/**
 * Test is date valid
 */
const isValidDate = (date: Date): boolean =>
  isValid(date) && isAfter(date, new Date('1000-01-01'));

/**
 * Test is entered string a date string in Finnish format without dots (e.g. 31122019)
 */
const isShortDateStr = (str: string) =>
  str.length === 8 && /^[0-9.]+$/.test(str);

const getShortDateStr = (str: string): string =>
  [str.substring(0, 2), str.substring(2, 4), str.substring(4, 9)].join('.');

/**
 * Get date object from valid Finnish date string
 */
const getParsedDate = (value: string): Date =>
  parse(value, 'd.M.yyyy', new Date(), { locale: fi });

/**
 * Convert string in Finnish date format (e.g. 31.12.2019) or in format without dots (e.g. 31122019) to Date object
 */
export const convertFinnishDateStrToDate = (str: string): Date | null => {
  let parsedDate = getParsedDate(str);

  if (isValidDate(parsedDate)) {
    return parsedDate;
  } else if (isShortDateStr(str)) {
    const dateStr = getShortDateStr(str);

    parsedDate = getParsedDate(dateStr);

    if (isValidDate(parsedDate)) {
      return parsedDate;
    }
  }
  return null;
};
