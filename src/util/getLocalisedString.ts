import { supportedLanguages } from '../constants';
import { LocalizedObject } from '../generated/graphql';
import { Language } from '../types';

/**
 * Check is the instance that is rendering component client (not SSR)
 */
const getLocalizedString = (
  obj: LocalizedObject | undefined | null = {},
  language: Language
): string => {
  if (obj === null) {
    return '';
  }

  const languages = [
    language,
    ...supportedLanguages.filter((item) => item !== language),
  ];
  // Find first language which has value
  const locale = languages.find((lng) => obj[lng]);
  // Return value in correct language
  return (locale && obj[locale]) || '';
};

export default getLocalizedString;
