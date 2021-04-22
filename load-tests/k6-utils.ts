// eslint-disable-next-line import/no-unresolved
import { check } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { parseHTML, Selection } from 'k6/html';
// eslint-disable-next-line import/no-unresolved
import http, { RefinedResponse, ResponseType } from 'k6/http';

//TODO import does not work?
import { ROUTES } from '../src/domain/app/routes/constants';
import { getEventFields } from '../src/domain/event/EventUtils';
import { EventFields } from '../src/domain/event/types';

// Environment variables can be added to run command:
// eslint-disable-next-line max-len
// k6 run -e BASE_URL=https://tapahtumat.test.kuva.hel.ninja GRAPHQL_BASE_URL -e GRAPHQL_BASE_URL=https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql  some.k6.test.js
// more info: https://k6.io/docs/using-k6/environment-variables/

export const BASE_URL =
  // eslint-disable-next-line no-undef
  __ENV.BASE_URL || 'https://tapahtumat.test.kuva.hel.ninja';

export type PageType = {
  [K in keyof typeof ROUTES]: typeof ROUTES[K] | ((param: string) => string);
};

export const Page: PageType = {
  ...ROUTES,
  EVENT: (id: string) => ROUTES.EVENT.replace(':id', id),
  COLLECTION: (slug: string) => ROUTES.COLLECTION.replace(':slug', slug),
};

export const getUrl = (page: keyof PageType, value?: string): string =>
  `${BASE_URL}/fi${
    typeof Page[page] === 'function' && typeof value === 'string'
      ? (Page[page] as (param: string) => string)(value)
      : Page[page]
  }`;

export const checkResponse = <R extends ResponseType | undefined>(
  response: RefinedResponse<R>
): void => {
  check(response, {
    'is status 200': (r) => r.status === 200,
  });
};

export const loadUrlDocument = (
  page: keyof PageType,
  value?: string
): Selection => {
  const response = http.get(getUrl(page, value));
  checkResponse(response);
  return parseHTML(response.body as string);
};

export const loadEventImage = (event: EventFields): void => {
  const { imageUrl } = getEventFields(event, 'fi');
  loadImage(imageUrl);
};

export const loadImage = (imageUrl: string): void => {
  const response = http.get(imageUrl, {
    headers: {
      referer: BASE_URL,
    },
  });
  checkResponse(response);
};
