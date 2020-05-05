import get from "lodash/get";

import { LandingPage } from "../../generated/graphql";
import { Language } from "../../types";

/**
 * Get landing page hero background image
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroBackgroundImage = (
  landingPage: LandingPage,
  locale: Language
): string => {
  return get(landingPage, `heroBackgroundImage.${locale}`);
};

/**
 * Get landing page hero top layer image
 * @param {object} landingPage
 * @param {string} locale
 * @return {string}
 */
export const getHeroTopLayerImage = (
  landingPage: LandingPage,
  locale: Language
): string => {
  return get(landingPage, `heroTopLayerImage.${locale}`);
};
