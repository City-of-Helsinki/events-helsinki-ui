// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { Selection } from 'k6/html';
// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import { getEventIdFromUrl } from '../src/domain/event/EventUtils';
import { skipFalsyType } from '../src/util/typescript.utils';
import {
  loadCollection,
  loadCuratedEvents,
  loadEventDetails,
} from './k6-graphql-utils';
import { loadEventImage, loadUrlDocument } from './k6-utils';

export const options: Options = {
  duration: '10m',
  // number of virtual users
  vus: 20,
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

const loadEventPage = (eventId: string) => {
  loadUrlDocument('EVENT', eventId);
  const { data } = loadEventDetails(eventId);
  loadEventImage(data.eventDetails);
};

const loadCollectionPage = (collectionSlug: string) => {
  // load collection page and its events
  loadUrlDocument('COLLECTION', collectionSlug);
  const curatedEventIds = loadCollectionPageCuratedEventIds(collectionSlug);
  const { data } = loadCuratedEvents(curatedEventIds);
  data.eventsByIds.forEach(loadEventImage);
  return {
    curatedEventIds,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadTestUserGoesToEventThroughCollection = () => {
  // load front page and pick up random collection
  const frontPage = loadFrontPageDocument();
  sleep(2);
  const { slug: collectionSlug } = getRandomCollectionLinkAndSlug(frontPage);
  const { curatedEventIds } = loadCollectionPage(collectionSlug);
  sleep(2);
  // if collection has non-expired events, pick randomly one and load event page
  if (curatedEventIds.length > 0) {
    const randomEventId = getRandomElement(curatedEventIds);
    loadEventPage(randomEventId);
    sleep(2);
  }
};

const loadTestUserGoesToEventThroughVappuCollection = () => {
  // load front page and load vappu collection
  loadFrontPageDocument();
  sleep(2);
  const { curatedEventIds } = loadCollectionPage('etävapun-testikokoelma');
  sleep(2);
  // pick random event and load event page
  const randomEventId = getRandomElement(curatedEventIds);
  loadEventPage(randomEventId);
  sleep(2);
};

export default (): void => {
  //loadTestUserGoesToEventThroughCollection();
  loadTestUserGoesToEventThroughVappuCollection();
};
