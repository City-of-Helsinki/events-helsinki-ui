// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import { EventFieldsFragment } from '../browser-tests/utils/generated/graphql';
import { loadCollectionPage } from './pages/collectionPage.k6';
import { loadEventPage } from './pages/eventPage.k6';
import { loadLandingPageDocument } from './pages/landingPage.k6';
import { getRandomElement } from './utils/random.utils.k6';

export const options: Options = {
  duration: '1m',
  // number of virtual users
  vus: 5,
  thresholds: {
    //95 % of requests should be under 1 second
    http_req_duration: ['p(95)<1000'],
  },
};

const loadTestUserGoesToEventThroughVappuCollection = () => {
  // load front page and load vappu collection
  loadLandingPageDocument();
  sleep(2);
  const { cureatedEvents } = loadCollectionPage('etävapun-testikokoelma');
  sleep(2);
  // pick random event and load event page
  const randomEvent = getRandomElement<EventFieldsFragment>(cureatedEvents);
  loadEventPage(randomEvent.id);
  sleep(2);
};

export default (): void => {
  loadTestUserGoesToEventThroughVappuCollection();
};
