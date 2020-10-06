import { isPast, isThisWeek, isToday } from 'date-fns';
import capitalize from 'lodash/capitalize';

import { EVENT_STATUS } from '../../constants';
import {
  EventFieldsFragment,
  PlaceFieldsFragment,
} from '../../generated/graphql';
import { Language } from '../../types';
import getLocalisedString from '../../util/getLocalisedString';
import {
  EVENT_KEYWORD_BLACK_LIST,
  EVENT_PLACEHOLDER_IMAGES,
  EVENT_SOME_IMAGE,
} from './constants';
import { KeywordOption } from './types';

/**
 * Check is event closed
 * @param event
 * @return {boolean}
 */
export const isEventClosed = (event: EventFieldsFragment): boolean => {
  return !!event.endTime && isPast(new Date(event.endTime));
};

/**
 * Check is event cancelled
 * @param event
 * @return {boolean}
 */
export const isEventCancelled = (event: EventFieldsFragment): boolean => {
  return event.eventStatus === EVENT_STATUS.EVENT_CANCELLED;
};

/**
 * Check is event free
 * @param eventData
 * @return {boolean}
 */
export const isEventFree = (event: EventFieldsFragment): boolean => {
  const offer = event.offers.find((item) => item.isFree);

  return !!offer?.isFree;
};

/**
 * Get event id from url
 * @param {string} url
 * @return {string}
 */
export const getEventIdFromUrl = (url: string): string | null => {
  const trimmedUrl = url.replace(/\?(.*)/, '');
  const eventId = trimmedUrl.match(/event\/(.*)/);

  return eventId?.length ? eventId[1].replace('/', '') : null;
};

/**
 * Get event price as a string
 * @param {object} event
 * @param {string} locale
 * @param {string} isFreeText - text to return if case that event is free
 * @return {string}
 */
export const getEventPrice = (
  event: EventFieldsFragment,
  locale: Language,
  isFreeText: string
): string => {
  return isEventFree(event)
    ? isFreeText
    : event.offers
        .map((offer) =>
          getLocalisedString(offer.price || offer.description, locale)
        )
        .filter((e) => e)
        .sort()
        .join(', ');
};

/**
 * Get event keywords
 * @param {object} event
 * @param {string} locale
 * @return {object[]}
 */
export const getEventKeywords = (
  event: EventFieldsFragment,
  locale: Language
): KeywordOption[] => {
  return event.keywords
    .map((keyword) => ({
      id: keyword.id || '',
      name: capitalize(keyword.name?.[locale] || '').trim(),
    }))
    .filter(
      (keyword, index, arr) =>
        !!keyword.name &&
        !EVENT_KEYWORD_BLACK_LIST.includes(keyword.id) &&
        arr.findIndex(
          (item) => item.name.toLowerCase() === keyword.name.toLowerCase()
        ) === index
    )
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
};

/**
 * Get event placeholder image url
 * @param {object} event
 * @return {string}
 */
export const getEventPlaceholderImageUrl = (
  event: EventFieldsFragment
): string => {
  const numbers = event.id.match(/\d+/g);
  const sum = numbers
    ? numbers.reduce((prev: number, cur: string) => prev + Number(cur), 0)
    : 0;
  const index = sum % 4;

  return EVENT_PLACEHOLDER_IMAGES[index];
};

/**
 * Get event image url
 * @param {object} event
 * @return {string}
 */
export const getEventImageUrl = (event: EventFieldsFragment): string => {
  // const image = event.images.length ? event.images[0] : null;
  const image = event.images[0];
  return image?.url || getEventPlaceholderImageUrl(event);
};

/**
 * Get event image url for social media
 * @param {object} event
 * @return {string}
 */
export const getEventSomeImageUrl = (event: EventFieldsFragment): string => {
  const image = event.images[0];
  return image?.url || EVENT_SOME_IMAGE;
};

/**
 * Get event district info as string
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getEventDistrict = (
  event: EventFieldsFragment,
  locale: Language
): string | null => {
  const location = event.location;
  const district = location?.divisions?.find((division) =>
    ['district', 'neighborhood'].includes(division.type)
  );

  return getLocalisedString(district?.name, locale);
};

/**
 * Get event location fields
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
const getEventLocationFields = (
  event: EventFieldsFragment,
  locale: Language
) => {
  const location = event.location;
  return {
    addressLocality: getLocalisedString(location?.addressLocality, locale),
    coordinates: [...(location?.position?.coordinates || [])].reverse(),
    district: getEventDistrict(event, locale),
    location,
    postalCode: location?.postalCode,
    streetAddress: getLocalisedString(location?.streetAddress, locale),
  };
};

/**
 * Get Google link to show event location
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getGoogleLink = (
  event: EventFieldsFragment,
  locale: Language
): string => {
  const {
    addressLocality,
    coordinates,
    postalCode,
    streetAddress,
  } = getEventLocationFields(event, locale);

  return `https://www.google.com/maps/place/${streetAddress},+${postalCode}+${addressLocality}/@${coordinates.join(
    ','
  )}`.replace(/\s/g, '+');
};

/**
 * Get palvelukartta compatible id for the location
 * @param {object} location
 * @return {string}
 */
const getLocationId = (location?: PlaceFieldsFragment | null) => {
  return location?.id ? location?.id.split(':').slice(1).join() : '';
};

/**
 * Get service map url
 * @param {object} event
 * @param {string} locale
 * @param {boolean} isEmbedded
 * @return {string}
 */
export const getServiceMapUrl = (
  event: EventFieldsFragment,
  locale: Language,
  isEmbedded?: boolean
): string => {
  const location = event.location;
  const locationId = getLocationId(location);
  return `https://palvelukartta.hel.fi/${locale}${
    isEmbedded ? '/embed' : ''
  }/unit/${locationId}`;
};

/**
 * Get Google link to show directions to event location
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getGoogleDirectionsLink = (
  event: EventFieldsFragment,
  locale: Language
): string => {
  const {
    addressLocality,
    coordinates,
    postalCode,
    streetAddress,
  } = getEventLocationFields(event, locale);

  return `https://www.google.com/maps/dir//${streetAddress},+${postalCode}+${addressLocality}/@${coordinates.join(
    ','
  )}`.replace(/\s/g, '+');
};

/**
 * Get HSL link to show directions to event location
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getHslDirectionsLink = (
  event: EventFieldsFragment,
  locale: Language
): string => {
  const {
    addressLocality,
    coordinates,
    streetAddress,
  } = getEventLocationFields(event, locale);

  return `https://reittiopas.hsl.fi/%20/${encodeURIComponent(
    streetAddress
  )},%20${encodeURIComponent(addressLocality)}::${coordinates.join(
    ','
  )}?locale=${locale}`;
};

/**
 * Get offer info url
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
const getOfferInfoUrl = (
  event: EventFieldsFragment,
  locale: Language
): string => {
  const offer = event.offers.find((item) =>
    getLocalisedString(item.infoUrl, locale)
  );

  return getLocalisedString(offer?.infoUrl, locale);
};

/**
 * Get event fields
 * @param {object} event
 * @param {string} locale
 * @return {object}
 */
export const getEventFields = (
  event: EventFieldsFragment,
  locale: Language
) => {
  const eventLocation = event.location;
  const offerInfoUrl = getOfferInfoUrl(event, locale);
  return {
    description: getLocalisedString(event.description, locale),
    district: getEventDistrict(event, locale),
    email: eventLocation?.email,
    endTime: event.endTime,
    id: event.id,
    name: getLocalisedString(event.name, locale),
    externalLinks: event.externalLinks,
    googleDirectionsLink: getGoogleDirectionsLink(event, locale),
    hslDirectionsLink: getHslDirectionsLink(event, locale),
    imageUrl: getEventImageUrl(event),
    infoUrl: getLocalisedString(event.infoUrl, locale),
    keywords: getEventKeywords(event, locale),
    languages: event.inLanguage
      .map((item) => capitalize(getLocalisedString(item.name, locale)))
      .filter((e) => e),
    locationName: getLocalisedString(eventLocation?.name, locale),
    offerInfoUrl,
    placeholderImage: getEventPlaceholderImageUrl(event),
    provider: getLocalisedString(event.provider, locale),
    publisher: event.publisher || '',
    shortDescription: getLocalisedString(event.shortDescription, locale),
    someImageUrl: getEventSomeImageUrl(event),
    startTime: event.startTime,
    telephone: getLocalisedString(eventLocation?.telephone, locale),
    freeEvent: isEventFree(event),
    today: event.startTime ? isToday(new Date(event.startTime)) : false,
    thisWeek: event.startTime ? isThisWeek(new Date(event.startTime)) : false,
    showBuyButton: !!offerInfoUrl && !isEventFree(event),
    ...getEventLocationFields(event, locale),
  };
};
