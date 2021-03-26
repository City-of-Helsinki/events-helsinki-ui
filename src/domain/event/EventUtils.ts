import { isPast, isThisWeek, isToday } from 'date-fns';
import capitalize from 'lodash/capitalize';
import sum from 'lodash/sum';

import { EVENT_STATUS } from '../../constants';
import {
  EventFieldsFragment,
  LocalizedObject,
  PlaceFieldsFragment,
} from '../../generated/graphql';
import { Language } from '../../types';
import getLocalisedString from '../../util/getLocalisedString';
import getSecureImage from '../../util/getSecureImage';
import { isCourseEvent } from '../../util/typeGuards';
import {
  EVENT_KEYWORD_BLACK_LIST,
  EVENT_PLACEHOLDER_IMAGES,
  EVENT_SOME_IMAGE,
} from './constants';
import { EventFields, KeywordOption } from './types';

export const getEventCardId = (id: string): string => `event-card_${id}`;

export const getLargeEventCardId = (id: string): string =>
  `large-event-card_${id}`;

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
 * For example  https://api.hel.fi/linkedcourses/v1/event/harrastushaku:13433?query -> harrastushaku:13433
 */
export const getEventIdFromUrl = (url: string): string | null => {
  const result = url.match(/\/event\/([^/?]*)/i);
  return result?.[1] || null;
};

/*
 * Format string to price format (add €) if it is a number and is missing currency
 * For example:
 * 'random text' -> 'random text'
 * '2' -> '2 €'
 * '2.5' -> '2.5 €'
 * '30/50' -> '30/50 €'
 * '30-50' -> '30-50 €'
 */
export const formatPrice = (price?: string): string => {
  if (!price) {
    return '';
  }

  const priceRegex = /^\d+([/\-.,]\d+)?$/;
  return price.match(priceRegex) ? `${price} €` : price;
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
          // Format text to price if it happens to be number e.g. '2' -> '2 €'
          formatPrice(
            getLocalisedString(offer.price || offer.description, locale)
          )
        )
        .filter((e) => e)
        .sort()
        .join(', ');
};

export const getKeywordList = (
  list: {
    id?: string | null;
    name: LocalizedObject | null;
  }[] = [],
  locale: Language
): KeywordOption[] => {
  return list
    .map((listItem) => ({
      id: listItem.id || '',
      name: capitalize(listItem.name?.[locale] || '').trim(),
    }))
    .filter(
      (listItem, index, arr) =>
        !!listItem.id &&
        !!listItem.name &&
        !EVENT_KEYWORD_BLACK_LIST.includes(listItem.id) &&
        arr.findIndex((item) => item.name === listItem.name) === index
    )
    .sort((a, b) => (a.name > b.name ? 1 : -1));
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
  const index = numbers ? sum(numbers) % 4 : 0;

  return EVENT_PLACEHOLDER_IMAGES[index];
};

/**
 * Get event image url
 * @param {object} event
 * @return {string}
 */
export const getEventImageUrl = (event: EventFieldsFragment): string => {
  const image = event.images[0];

  return getSecureImage(image?.url) || getEventPlaceholderImageUrl(event);
};

/**
 * Get event image url for social media
 * @param {object} event
 * @return {string}
 */
export const getEventSomeImageUrl = (event: EventFieldsFragment): string => {
  const image = event.images[0];
  return getSecureImage(image?.url) || EVENT_SOME_IMAGE;
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

const getCourseFields = (event: EventFields) => {
  if (isCourseEvent(event)) {
    // return all courseFields without __typename :)
    // might be stupid?
    const { __typename, ...courseFields } = event.extensionCourse || {};
    return courseFields;
  }
};

/**
 * Get palvelukartta compatible id for the location
 * @param {object} location
 * @return {string}
 */
export const getLocationId = (
  location?: PlaceFieldsFragment | null
): string => {
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
  event: EventFields,
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

const getRegistrationUrl = (event: EventFieldsFragment) => {
  return event.externalLinks?.find((externalLink) => {
    return externalLink.name === 'registration';
  })?.link;
};

/**
 * Get event fields
 * @param {object} event
 * @param {string} locale
 * @return {object}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEventFields = (event: EventFields, locale: Language) => {
  const eventLocation = event.location;
  const offerInfoUrl = getOfferInfoUrl(event, locale);
  const registrationUrl = getRegistrationUrl(event);
  const startTime = event.startTime;
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
    keywords: getKeywordList(event.keywords, locale),
    languages: event.inLanguage
      .map((item) => capitalize(getLocalisedString(item.name, locale)))
      .filter((e) => e),
    locationName: getLocalisedString(eventLocation?.name, locale),
    offerInfoUrl,
    registrationUrl,
    placeholderImage: getEventPlaceholderImageUrl(event),
    provider: getLocalisedString(event.provider, locale),
    publisher: event.publisher || '',
    shortDescription: getLocalisedString(event.shortDescription, locale),
    someImageUrl: getEventSomeImageUrl(event),
    startTime,
    telephone: getLocalisedString(eventLocation?.telephone, locale),
    freeEvent: isEventFree(event),
    today: startTime ? isToday(new Date(startTime)) : false,
    thisWeek: startTime ? isThisWeek(new Date(startTime)) : false,
    showBuyButton: !!offerInfoUrl && !isEventFree(event),
    audience: getKeywordList(event.audience, locale),
    photographerName: event.images[0]?.photographerName,
    ...getCourseFields(event),
    ...getEventLocationFields(event, locale),
  };
};
