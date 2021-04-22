// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import { loadUrlDocument } from './k6-utils';
export const options: Options = {
  duration: '10m',
  vus: 20,
  thresholds: {
    //avg is around 800ms on https://tapahtumat.test.kuva.hel.ninja
    http_req_duration: ['p(95)<5000'],
  },
};

const loadTestEventSearchPage = () => {
  loadUrlDocument('EVENTS');
  //10 loads per minute
  sleep(6);
};

export default (): void => {
  loadTestEventSearchPage();
};
