import { BannerPage, Maybe } from '../../generated/graphql';
import { Breakpoint, LandingPageTextColor, Language } from '../../types';
import { BANNER_SOME_IMAGE } from './bannerConstants';

export type BannerHeroProps = {
  banner: BannerPage;
  location: 'top' | 'bottom';
};

export const getTestIds = (
  location: BannerHeroProps['location']
): Record<string, string> => ({
  container: `${location}-banner`,
  content: `${location}-banner-content`,
  desktopBackgroundImage: `${location}-desktopBackgroundImage`,
  mobileBackgroundImage: `${location}-mobileBackgroundImage`,
  heroTopLayerImage: `${location}-heroTopLayerImage`,
});

export const getBannerContentTextWrapperMaxWidth = (
  breakpoint: Breakpoint
): number | undefined => {
  switch (breakpoint) {
    case 'md':
      return 400;
    case 'lg':
    case 'xlg':
      return 560;
  }
};

export const getBannerContentTextFontSize = (
  breakpoint: Breakpoint
): number => {
  switch (breakpoint) {
    case 'lg':
    case 'xlg':
      return 80;
  }
  return 52;
};

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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getBannerFields = (
  locale: Language,
  banner?: Maybe<BannerPage>
) => {
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
    heroImageCredits:
      banner?.heroBackgroundImage?.[locale]?.photographerCredit?.[locale],
    someImage: getSomeImageUrl(locale, banner),
  };
};
