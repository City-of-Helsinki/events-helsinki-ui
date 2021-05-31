// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import { loadEventSearchPage } from './pages/eventSearchPage.k6';
export const options: Options = {
  duration: '1m',
  vus: 2,
  thresholds: {
    //avg is around 800ms on https://tapahtumat.test.kuva.hel.ninja
    http_req_duration: ['p(95)<5000'],
  },
};

const loadTestEventSearchPage = () => {
  loadEventSearchPage();
  //10 loads per minute
  sleep(6);
};

export default (): void => {
  loadTestEventSearchPage();
};
