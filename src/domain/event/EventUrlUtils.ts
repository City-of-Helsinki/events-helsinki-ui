import { EventType } from './types';

/**
 * Get event id from url
 * For example  https://api.hel.fi/linkedcourses/v1/event/harrastushaku:13433?query -> harrastushaku:13433
 */
export const getEventIdFromUrl = (
  url: string,
  type: EventType = 'event'
): string | undefined => {
  return url.match(new RegExp(`/(?:${type}s?)/([^/?]*)`, 'i'))?.[1];
};

export const getEventIdsFromUrls = (
  urls: string[]
): { eventIds: string[]; courseIds: string[] } => {
  return {
    eventIds: urls
      .map((url) => getEventIdFromUrl(url, 'event') as string)
      .filter(Boolean),
    courseIds: urls
      .map((url) => getEventIdFromUrl(url, 'course') as string)
      .filter(Boolean),
  };
};
