// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import collectionsTest from './collections.k6.test';
import eventSearchPageTest from './eventSearchPage.k6.test';

export const options: Options = {
  duration: '5m',
  // number of virtual users
  vus: 10,
  thresholds: {
    //95 % of requests should be under 1 second
    http_req_duration: ['p(95)<1000'],
  },
};

export default (): void => {
  eventSearchPageTest();
  collectionsTest();
};
