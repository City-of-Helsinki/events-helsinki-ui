// eslint-disable-next-line import/no-unresolved
import { check, fail } from 'k6';
// eslint-disable-next-line import/no-unresolved
import { parseHTML, Selection } from 'k6/html';
// eslint-disable-next-line import/no-unresolved
import http, { RefinedResponse, ResponseType } from 'k6/http';

import { ROUTES } from '../../src/domain/app/routes/constants';

// eslint-disable-next-line no-undef
export const BASE_URL = __ENV.BASE_URL ?? 'http://localhost:3000';

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

let failures = 0;

export const checkResponse = <R extends ResponseType | undefined>(
  response: RefinedResponse<R>
): void => {
  check(response, {
    'is status 200': (response) => {
      const isOk = response.status === 200;
      failures += Number(isOk);
      return isOk;
    },
  });
  if (failures > 9) {
    fail('too many failed responses');
  }
};

export const loadUrlDocument = (
  page: keyof PageType,
  value?: string
): Selection => {
  const response = http.get(getUrl(page, value));
  checkResponse(response);
  return parseHTML(response.body as string);
};

export const loadImage = (imageUrl: string): void => {
  const response = http.get(imageUrl, {
    headers: {
      referer: BASE_URL,
    },
  });
  checkResponse(response);
};
