// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';
// eslint-disable-next-line import/no-unresolved
import { Selection } from 'k6/html';
import { getEventIdFromUrl } from '../src/domain/event/EventUrlUtils';
import { skipFalsyType } from '../src/util/typescript.utils';
import {
  loadCollection,
  loadCuratedEvents,
  loadEventDetails,
} from './k6-graphql-utils';
import { loadUrlDocument } from './k6-utils';

export const options: Options = {
  duration: '1m',
  // number of virtual users
  vus: 2,
  thresholds: {
    //95 % of requests should be under 1 second
    http_req_duration: ['p(95)<1000'],
  },
};

const loadFrontPageDocument = () => loadUrlDocument('HOME');

const getRandomSelectionElement = (selectionCollection: Selection) => {
  const randomIndex = Math.floor(Math.random() * selectionCollection.size());
  return selectionCollection.get(randomIndex);
};

const getRandomElement = <T>(list: T[]): T => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

const getRandomCollectionLinkAndSlug = (doc: Selection) => {
  const collections = doc.find('a[aria-label^="Siirry kokoelmaan"]');
  const link = getRandomSelectionElement(collections).getAttribute('href');
  return {
    slug: link.substring(link.lastIndexOf('/') + 1),
  };
};

const loadCollectionPageCuratedEventIds = (slug: string) => {
  const { data } = loadCollection(slug);
  return data.collectionDetails.curatedEvents
    .map((url) => getEventIdFromUrl(url, 'event'))
    .filter(skipFalsyType);
};

const loadEventPage = (eventId: string) => loadUrlDocument('EVENT', eventId);

const loadCollectionPage = (collectionSlug: string) => {
  // load collection page and its events
  loadUrlDocument('COLLECTION', collectionSlug);
  const curatedEventIds = loadCollectionPageCuratedEventIds(collectionSlug);
  loadCuratedEvents(curatedEventIds);
  return {
    curatedEventIds,
  };
};

const loadTestUserGoesToEventThroughCollection = () => {
  // load front page and pick up random collection
  const frontPage = loadFrontPageDocument();
  const { slug: collectionSlug } = getRandomCollectionLinkAndSlug(frontPage);
  const { curatedEventIds } = loadCollectionPage(collectionSlug);
  sleep(2);
  // if collection has non-expired events, pick randomly one and load event page
  if (curatedEventIds.length > 0) {
    const randomEventId = getRandomElement(curatedEventIds);
    // load random event page
    loadEventPage(randomEventId);
    loadEventDetails(randomEventId);
    sleep(2);
  }
};

export default (): void => {
  loadTestUserGoesToEventThroughCollection();
};
