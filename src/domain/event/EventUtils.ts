import { isPast } from "date-fns";
import capitalize from "lodash/capitalize";

import { EventDetailsQuery } from "../../generated/graphql";
import { Language } from "../../types";
import getLocalisedString from "../../util/getLocalisedString";
import {
  EVENT_KEYWORD_BLACK_LIST,
  EVENT_PLACEHOLDER_IMAGES,
  EVENT_SOME_IMAGE
} from "./constants";
import { EventInList, EventUiKeyword } from "./types";

/**
 * Check is event closed
 * @param event
 * @return {boolean}
 */
export const isEventClosed = (event: EventInList): boolean => {
  return !!event.endTime && isPast(new Date(event.endTime));
};

/**
 * Check is event free
 * @param eventData
 * @return {boolean}
 */
export const isEventFree = (event: EventInList): boolean => {
  const offer = event.offers.find(item => item.isFree);

  return !!offer && !!offer.isFree;
};

/**
 * Get event district info as string
 * @param {object} event
 * @param {string} locale
 * @return {string}
 */
export const getEventDistrict = (
  event: EventInList,
  locale: Language
): string | null => {
  const location = event.location;
  const divisions = (location && location.divisions) || [];
  const district = divisions.find(division =>
    ["district", "neighborhood"].includes(division.type)
  );

  return district && district.name
    ? getLocalisedString(district.name, locale)
    : null;
};

/**
 * Get event price as a string
 * @param {object} event
 * @param {string} locale
 * @param {string} isFreeText - text to return if case that event is free
 * @return {string}
 */
export const getEventPrice = (
  event: EventInList,
  locale: Language,
  isFreeText: string
): string => {
  return isEventFree(event)
    ? isFreeText
    : event.offers
        .map(offer =>
          getLocalisedString(offer.price || offer.description || {}, locale)
        )
        .filter(e => e)
        .sort()
        .join(", ");
};

/**
 * Get event keywords
 * @param {object} event
 * @param {string} locale
 * @return {object[]}
 */
export const getEventKeywords = (
  event: EventInList,
  locale: Language
): EventUiKeyword[] => {
  return event.keywords
    .map(keyword => ({
      id: keyword.id,
      name: capitalize(getLocalisedString(keyword.name, locale)).trim()
    }))
    .filter(
      (keyword, index, arr) =>
        !EVENT_KEYWORD_BLACK_LIST.includes(keyword.id) &&
        arr.findIndex(item => item.name === keyword.name) === index
    )
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
};

/**
 * Get event placeholder image url
 * @param {object} event
 * @return {string}
 */
export const getEventPlaceholderImageUrl = (event: EventInList): string => {
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
export const getEventImageUrl = (event: EventInList): string => {
  const image = event.images.length ? event.images[0] : null;
  return image ? image.url : getEventPlaceholderImageUrl(event);
};

/**
 * Get event image url for social media
 * @param {object} event
 * @return {string}
 */
export const getEventSomeImageUrl = (event: EventInList): string => {
  const image = event.images.length ? event.images[0] : null;
  return image ? image.url : EVENT_SOME_IMAGE;
};

/**
 * Get Google link to show event location
 * @param {object} eventData
 * @param {string} locale
 * @return {string}
 */
export const getGoogleLink = (
  eventData: EventDetailsQuery,
  locale: Language
): string => {
  const location = eventData.eventDetails.location;
  const streetAddress = getLocalisedString(
    (location && location.streetAddress) || {},
    locale
  );
  const postalCode = (location && location.postalCode) || {};
  const addressLocality = getLocalisedString(
    (location && location.addressLocality) || {},
    locale
  );
  const coordinates =
    location && location.position
      ? // Get coordinates for Google in correct order
        [...location.position.coordinates].reverse()
      : [];

  return `https://www.google.com/maps/place/${streetAddress},+${postalCode}+${addressLocality}/@${coordinates.join(
    ","
  )}`.replace(/\s/g, "+");
};

/**
 * Get Google link to show directions to event location
 * @param {object} eventData
 * @param {string} locale
 * @return {string}
 */
export const getGoogleDirectionsLink = (
  eventData: EventDetailsQuery,
  locale: Language
): string => {
  const location = eventData.eventDetails.location;
  const streetAddress = getLocalisedString(
    (location && location.streetAddress) || {},
    locale
  );
  const postalCode = (location && location.postalCode) || {};
  const addressLocality = getLocalisedString(
    (location && location.addressLocality) || {},
    locale
  );
  const coordinates =
    location && location.position
      ? // Get coordinates for Google in correct order
        [...location.position.coordinates].reverse()
      : [];

  return `https://www.google.com/maps/dir//${streetAddress},+${postalCode}+${addressLocality}/@${coordinates.join(
    ","
  )}`.replace(/\s/g, "+");
};

/**
 * Get HSL link to show directions to event location
 * @param {object} eventData
 * @param {string} locale
 * @return {string}
 */
export const getHslDirectionsLink = (
  eventData: EventDetailsQuery,
  locale: Language
): string => {
  const location = eventData.eventDetails.location;
  const streetAddress = getLocalisedString(
    (location && location.streetAddress) || {},
    locale
  );
  const addressLocality = getLocalisedString(
    (location && location.addressLocality) || {},
    locale
  );
  const coordinates =
    location && location.position
      ? // Get coordinates for HSL in correct order
        [...location.position.coordinates].reverse()
      : [];

  return `https://reittiopas.hsl.fi/%20/${encodeURIComponent(
    streetAddress
  )},%20${encodeURIComponent(addressLocality)}::${coordinates.join(
    ","
  )}?locale=${locale}`;
};
