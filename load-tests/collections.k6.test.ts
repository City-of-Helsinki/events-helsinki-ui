// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import { EventFieldsFragment } from '../browser-tests/utils/generated/graphql';
import { loadCollectionPage } from './pages/collectionPage.k6';
import { loadEventPage } from './pages/eventPage.k6';
import {
  getRandomCollection,
  loadLandingPageDocument,
} from './pages/landingPage.k6';
import { getRandomElement } from './utils/random.utils.k6';

export const options: Options = {
  duration: '10m',
  // number of virtual users
  vus: 20,
  thresholds: {
    //95 % of requests should be under 1 second
    http_req_duration: ['p(95)<1000'],
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadTestUserGoesToEventThroughCollection = () => {
  // load front page and pick up random collection
  const { collections } = loadLandingPageDocument();
  sleep(2);
  const collection = getRandomCollection(collections);
  const { cureatedEvents } = loadCollectionPage(collection.slug);
  sleep(2);
  // if collection has non-expired events, pick randomly one and load event page
  if (cureatedEvents.length > 0) {
    const randomEvent = getRandomElement<EventFieldsFragment>(cureatedEvents);
    loadEventPage(randomEvent.id);
    sleep(2);
  }
};

export default (): void => {
  loadTestUserGoesToEventThroughCollection();
};
