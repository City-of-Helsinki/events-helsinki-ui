import { MAPPED_PLACES } from '../../eventSearch/constants';

// add place from path to query string when navigating to event page
// e.g. /fi/annantalo -> /fi/event/kulke:51543?places=tprek%3A7254
export const addPlaceFromPathToQueryString = (
  search: string,
  place?: string
): string => {
  if (place) {
    const searchParams = new URLSearchParams(search);
    searchParams.append('places', MAPPED_PLACES[place]);
    return '?' + searchParams.toString();
  }
  return search;
};
