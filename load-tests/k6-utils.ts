// eslint-disable-next-line import/no-unresolved
import { parseHTML, Selection } from 'k6/html';
// eslint-disable-next-line import/no-unresolved
import http from 'k6/http';

//TODO import does not work?
//import { ROUTES } from '../src/domain/app/routes/constants';

// Environment variables can be added to run command:
// eslint-disable-next-line max-len
// k6 run -e BASE_URL=https://tapahtumat.test.kuva.hel.ninja GRAPHQL_BASE_URL -e GRAPHQL_BASE_URL=https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql  some.k6.test.js
// more info: https://k6.io/docs/using-k6/environment-variables/

export const BASE_URL =
  // eslint-disable-next-line no-undef
  __ENV.BASE_URL || 'https://tapahtumat.test.kuva.hel.ninja';

export const GRAPHQL_BASE_URL =
  // eslint-disable-next-line no-undef
  __ENV.GRAPHQL_BASE_URL ||
  'https://tapahtumat-proxy.test.kuva.hel.ninja/proxy/graphql';

const ROUTES = {
  ABOUT: '/about',
  ACCESSIBILITY: '/accessibility',
  COLLECTION: '/collection/:slug',
  COLLECTIONS: '/collections',
  EVENTS: '/events',
  EVENT: '/events/:id',
  EVENT_DEPRECATED: '/event/:id',
  COURSES: '/courses',
  COURSE: '/courses/:id',
  HOME: '/home',
  HOME_PREVIEW: '/home/:id',
};

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

export const loadUrlDocument = (
  page: keyof PageType,
  value?: string
): Selection => {
  const res = http.get(getUrl(page, value));
  // https://k6.io/docs/javascript-api/k6-html/parsehtml-src
  return parseHTML(res.body as string);
};
