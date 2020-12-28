import { LandingPageFieldsFragment } from '../../generated/graphql';
import { Language } from '../../types';
import { getBannerFields } from '../banner/bannerUtils';

/**
 * Test is language supported on landing page
 * @param {object} landingPage
 * @param {string} locale
 * @return {boolean}
 */
export const isLanguageSupported = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): boolean => {
  return Boolean(landingPage.title?.[locale]);
};

/**
 * Get landing page fields
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLandingPageFields = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
) => ({
  pageTitle: landingPage.pageTitle?.[locale] || '',
  keywords: landingPage.keywords?.[locale],
  metaInformation: landingPage.metaInformation?.[locale] || '',
  topBanner: getBannerFields(locale, landingPage.topBanner),
  bottomBanner: getBannerFields(locale, landingPage.bottomBanner),
});
