import { LandingPageFieldsFragment } from "../../generated/graphql";
import { Language } from "../../types";
import { LANDING_PAGE_SOME_IMAGE } from "./constants";

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
  return (landingPage.heroBackgroundImage || {})[locale] || "";
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
  return (landingPage.heroBackgroundImageMobile || {})[locale] || "";
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
  return (landingPage.heroTopLayerImage || {})[locale] || "";
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
  const image = (landingPage.socialMediaImage || {})[locale];
  return image || LANDING_PAGE_SOME_IMAGE;
};
