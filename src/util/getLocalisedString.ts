import { SUPPORT_LANGUAGES } from '../constants';
import { LocalizedObject } from '../generated/graphql';
import { Language } from '../types';

/**
 * Check is the instance that is rendering component client (not SSR)
 */
export default (obj: LocalizedObject, language: Language) => {
  const languages = [
    language,
    ...Object.values(SUPPORT_LANGUAGES).filter(item => item !== language),
  ];
  // Find first langauge which has value
  const locale = languages.find(lng => obj[lng]);
  // Return value in correct language
  return locale ? obj[locale] || '' : '';
};
