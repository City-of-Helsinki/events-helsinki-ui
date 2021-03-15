import { CollectionFieldsFragment } from '../../generated/graphql';
import { Language } from '../../types';
import { COLLECTION_DEFAULT_IMAGE, HERO_BACKGROUND_COLOR } from './constants';

/**
 * Get hero text content background color
 * @param {object} collection
 * @return {string}
 */
export const getHeroBackgroundColor = (
  collection: CollectionFieldsFragment
): string => {
  switch (collection.boxColor) {
    case HERO_BACKGROUND_COLOR.COPPER:
    case HERO_BACKGROUND_COLOR.ENGEL:
    case HERO_BACKGROUND_COLOR.FOG:
    case HERO_BACKGROUND_COLOR.SUOMENLINNA:
      return collection.boxColor.toLowerCase();
    default:
      return HERO_BACKGROUND_COLOR.ENGEL.toLowerCase();
  }
};

/**
 * Get hero text content background image
 * @param {object} collection
 * @return {string}
 */
export const getHeroBackgroundImage = (
  collection: CollectionFieldsFragment
): string => {
  return collection.heroImage?.url || COLLECTION_DEFAULT_IMAGE;
};

/**
 * Test is collection supported in selected language
 * @param {object} collection
 * @param {string} language
 * @return {boolean}
 */
export const isLanguageSupported = (
  collection: CollectionFieldsFragment,
  language: Language
): boolean => {
  return !!collection.title[language];
};

/**
 * Test has collection expired
 * @param {object} collection
 * @return {boolean}
 */
export const isCollectionExpired = (
  collection: CollectionFieldsFragment
): boolean => {
  return Boolean(collection.expired);
};

export const collectionHasNotExpired = (
  collection: CollectionFieldsFragment
): boolean => !isCollectionExpired(collection);

export const isCollectionLive = (
  collection: CollectionFieldsFragment
): boolean => {
  return Boolean(collection.live);
};

export const isCollectionVisible = (
  collection: CollectionFieldsFragment,
  locale: Language
): boolean => {
  return (
    isLanguageSupported(collection, locale) &&
    collectionHasNotExpired(collection) &&
    isCollectionLive(collection)
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCollectionFields = (
  collection: CollectionFieldsFragment,
  locale: Language
) => ({
  id: collection.id,
  slug: collection.slug,
  count: collection.curatedEvents.length,
  title: collection.title?.[locale] || '',
  description: collection.description?.[locale] || '',
  socialMediaDescription: collection.socialMediaDescription?.[locale] || '',
  keywords: collection.keywords?.[locale],
  linkText: collection.linkText?.[locale] || '',
  linkUrl: collection.linkUrl?.[locale] || '',
  eventListQuery: collection.eventListQuery?.[locale] || '',
  eventListTitle: collection.eventListTitle?.[locale] || '',
  heroBackgroundColor: getHeroBackgroundColor(collection),
  heroBackgroundImage: getHeroBackgroundImage(collection),
  heroImageCredits: collection.heroImage?.photographerCredit?.[locale],
});
