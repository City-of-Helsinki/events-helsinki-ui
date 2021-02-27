/* eslint-disable */
import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  duration: '10m',
  vus: 20,
  thresholds: {
    //todo: definition of failure
    http_req_duration: ['p(95)<500'],
  },
};

export default () => {
  const res = http.get('https://tapahtumat.test.kuva.hel.ninja/fi/events');
  //10 loads per minute
  sleep(6);
};
