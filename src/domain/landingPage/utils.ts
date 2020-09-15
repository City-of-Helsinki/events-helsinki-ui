import { LandingPageFieldsFragment } from '../../generated/graphql';
import { Language } from '../../types';
import { LANDING_PAGE_SOME_IMAGE } from './constants';

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
 * Get landing page hero background color
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroBackgroundColor = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): string | undefined => {
  const backgroundColor = (landingPage.heroBackgroundImageColor || {})[locale];
  return backgroundColor ? backgroundColor.toLowerCase() : undefined;
};
/**
 * Get landing page hero background image
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroBackgroundImage = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): string => {
  return (landingPage.heroBackgroundImage || {})[locale]?.url || '';
};

/**
 * Get landing page hero mobile background image
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroBackgroundImageMobile = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): string => {
  return (landingPage.heroBackgroundImageMobile || {})[locale]?.url || '';
};

/**
 * Get landing page hero title color
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroTitleColor = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): string => {
  return `var(--color-${(
    (landingPage.titleColor || {})[locale] || 'BLACK'
  ).toLowerCase()})`;
};

/**
 * Get landing page hero description color
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroDescriptionColor = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): string => {
  return `var(--color-${(
    (landingPage.descriptionColor || {})[locale] || 'BLACK'
  ).toLowerCase()})`;
};

/**
 * Get landing page hero top layer image
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroTopLayerImage = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): string => {
  return (landingPage.heroTopLayerImage || {})[locale]?.url || '';
};

/**
 * Get landing page image url for social media
 * @param {object} landingPage
 * @return {string}
 */
export const getLandingPageSomeImageUrl = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
): string => {
  const image = (landingPage.socialMediaImage || {})[locale]?.url;
  return image || LANDING_PAGE_SOME_IMAGE;
};

/**
 * Get landing page fields
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getLandingPageFields = (
  landingPage: LandingPageFieldsFragment,
  locale: Language
) => ({
  pageTitle: landingPage.pageTitle?.[locale],
  title: landingPage.title?.[locale],
  titleColor: getHeroTitleColor(landingPage, locale),
  description: landingPage.description?.[locale],
  descriptionColor: getHeroDescriptionColor(landingPage, locale),
  someDescription: landingPage.metaInformation?.[locale],
  buttonText: landingPage.buttonText?.[locale],
  buttonUrl: landingPage.buttonUrl?.[locale],
  backgroundColor: getHeroBackgroundColor(landingPage, locale),
  heroBackgroundImage: getHeroBackgroundImage(landingPage, locale),
  heroBackgroundImageMobile: getHeroBackgroundImageMobile(landingPage, locale),
  heroTopLayerImage: getHeroTopLayerImage(landingPage, locale),
  someImage: getLandingPageSomeImageUrl(landingPage, locale),
});
