// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import collectionsTest from './collections.k6.test';
import eventSearchPageTest from './eventSearchPage.k6.test';
import { loadTestUserGoesToEventThroughVappuCollection } from './vappu-collection.k6.test';

/*export const options: Options = {
  duration: '5m',
  // number of virtual users
  vus: 10,
  thresholds: {
    //95 % of requests should be under 1 second
    http_req_duration: ['p(95)<1000'],
  },
};*/

export const options: Options = {
  thresholds: {
    //95 % of requests should be under 1 second
    http_req_duration: ['p(95)<1000'],
  },
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        // ramping up from 0 to 100 in 10 minutes
        { duration: '10m', target: 100 },
        // keep running with 100 users for 45 minutes
        { duration: '45m', target: 100 },
        // ramping down to zero for last 5 minutes
        { duration: '5m', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
};


export default (): void => {
  loadTestUserGoesToEventThroughVappuCollection();
};
