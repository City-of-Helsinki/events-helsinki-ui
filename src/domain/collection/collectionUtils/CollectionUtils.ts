/**
 * Get event id from url
 * @param {string} url
 * @return {string}
 */
export const getEventIdFromUrl = (url: string): string | null => {
  const trimmedUrl = url.replace(/\?(.*)/, "");
  const eventId = trimmedUrl.match(/event\/(.*)/);

  return eventId && eventId.length ? eventId[1] : null;
};
