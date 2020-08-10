import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../constants';
import toCamelCase from './toCamelCase';
import toPascalCase from './toPascalCase';

/**
 * Translate a single value
 */
export const translateValue = (prefix: string, value: string, t: Function) => {
  return t(
    prefix
      ? `${prefix}${
          prefix.endsWith('.') ? toCamelCase(value) : toPascalCase(value)
        }`
      : toCamelCase(value)
  );
};

/**
 * Translate a list
 */
export const translateList = (prefix: string, list: string[], t: Function) => {
  return list.map(value => translateValue(prefix, value, t)).join(', ');
};

/**
 * Get language from the url
 * @param {string} url
 * @return {string}
 */
export const getLanguageFromUrl = (url: string): string => {
  const regEx = new RegExp(
    '^/(' + Object.values(SUPPORT_LANGUAGES).join('|') + ')/'
  );
  const localeMatch = url.match(regEx);
  return localeMatch && localeMatch.length
    ? localeMatch[0].replace(/\//g, '')
    : DEFAULT_LANGUAGE;
};
