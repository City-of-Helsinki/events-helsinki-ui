import { EventFieldsFragment } from '../../browser-tests/utils/generated/graphql';
import { getEventIdFromUrl } from '../../src/domain/event/EventUtils';
import { skipFalsyType } from '../../src/util/typescript.utils';
import { loadCollection, loadCuratedEvents } from '../utils/graphql.utils.k6';
import { loadUrlDocument } from '../utils/utils.k6';
import { loadEventImage } from './eventPage.k6';

type CollectionPageLoadedData = {
  cureatedEvents: EventFieldsFragment[];
};
export const loadCollectionPage = (
  collectionSlug: string
): CollectionPageLoadedData => {
  // load collection page and its events
  loadUrlDocument('COLLECTION', collectionSlug);
  const curatedEventIds = loadCollectionPageCuratedEventIds(collectionSlug);
  const { data } = loadCuratedEvents(curatedEventIds);
  data.eventsByIds.forEach(loadEventImage);
  return {
    cureatedEvents: data.eventsByIds,
  };
};

const loadCollectionPageCuratedEventIds = (slug: string) => {
  const { data } = loadCollection(slug);
  return data.collectionDetails.curatedEvents
    .map((url) => getEventIdFromUrl(url, 'event'))
    .filter(skipFalsyType);
};
