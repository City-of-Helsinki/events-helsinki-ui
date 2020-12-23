import { BannerPage, Maybe } from '../../generated/graphql';
import { LandingPageTextColor, Language } from '../../types';
import { BANNER_SOME_IMAGE } from './bannerConstants';

/**
 * Get banner hero background color
 * @param {string} locale
 * @param {object} banner
 * @return {string}
 */
export const getHeroBackgroundColor = (
  locale: Language,
  banner?: Maybe<BannerPage>
): string => {
  const backgroundColor = banner?.heroBackgroundImageColor?.[locale];
  return backgroundColor?.toLowerCase() || 'inherit';
};

/**
 * Get banner hero background image
 * @param {string} locale
 * @param {object} banner
 * @return {string}
 */
export const getHeroBackgroundImage = (
  locale: Language,
  banner?: Maybe<BannerPage>
): string => {
  return banner?.heroBackgroundImage?.[locale]?.url || '';
};

/**
 * Get banner hero mobile background image
 * @param {string} locale
 * @param {object} banner
 * @return {string}
 */
export const getHeroBackgroundImageMobile = (
  locale: Language,
  banner?: Maybe<BannerPage>
): string => {
  return banner?.heroBackgroundImageMobile?.[locale]?.url || '';
};

/**
 * Get banner hero title color
 * @param {string} locale
 * @param {object} banner
 * @return {string}
 */
export const getHeroTitleAndDescriptionColor = (
  locale: Language,
  banner?: Maybe<BannerPage>
): LandingPageTextColor => {
  return (
    (banner?.titleAndDescriptionColor?.[locale] as LandingPageTextColor) ||
    'BLACK'
  );
};

/**
 * Get banner hero top layer image
 * @param {string} locale
 * @param {object} banner
 * @return {string}
 */
export const getHeroTopLayerImage = (
  locale: Language,
  banner?: Maybe<BannerPage>
): string => {
  return banner?.heroTopLayerImage?.[locale]?.url || '';
};

/**
 * Get banner image url for social media
 * @param {string} locale
 * @param {object} banner
 * @return {string}
 */
export const getSomeImageUrl = (
  locale: Language,
  banner?: Maybe<BannerPage>
): string => {
  return banner?.socialMediaImage?.[locale]?.url || BANNER_SOME_IMAGE;
};

/**
 * Get banner fields
 * @param {string} locale
 * @param {object} banner
 * @return {string}
 */
export const getBannerFields = (
  locale: Language,
  banner?: Maybe<BannerPage>
): Record<string, string | Maybe<string>[] | null | undefined> => {
  return {
    title: banner?.title?.[locale] || '',
    description: banner?.description?.[locale] || '',
    keywords: banner?.keywords?.[locale],
    titleAndDescriptionColor: getHeroTitleAndDescriptionColor(locale, banner),
    buttonText: banner?.buttonText?.[locale] || '',
    buttonUrl: banner?.buttonUrl?.[locale] || '',
    backgroundColor: getHeroBackgroundColor(locale, banner),
    heroBackgroundImage: getHeroBackgroundImage(locale, banner),
    heroBackgroundImageMobile: getHeroBackgroundImageMobile(locale, banner),
    heroTopLayerImage: getHeroTopLayerImage(locale, banner),
    someImage: getSomeImageUrl(locale, banner),
  };
};
