import {
  MAPPED_PLACES,
  MARKETING_COLLECTION_SLUGS,
} from '../../eventSearch/constants';

// Remember also update static urls to updateSitemap
export type ROUTE_TYPES = {
  ABOUT: '/about';
  ACCESSIBILITY: '/accessibility';
  COLLECTION: '/collection/:slug';
  COLLECTIONS: '/collections';
  EVENTS: '/events';
  EVENT: '/events/:id';
  EVENT_DEPRECATED: '/event/:id';
  HOME: '/home';
  HOME_PREVIEW: '/home/:id';
  EVENT_PLACE: string;
  MARKETING_COLLECTION: string;
};

export const ROUTES: ROUTE_TYPES = {
  ABOUT: '/about',
  ACCESSIBILITY: '/accessibility',
  COLLECTION: '/collection/:slug',
  COLLECTIONS: '/collections',
  EVENTS: '/events',
  EVENT: '/events/:id',
  EVENT_DEPRECATED: '/event/:id',
  HOME: '/home',
  HOME_PREVIEW: '/home/:id',
  EVENT_PLACE: `/:place(${Object.keys(MAPPED_PLACES).join('|')})`,
  MARKETING_COLLECTION: `/:slug(${MARKETING_COLLECTION_SLUGS.join('|')})`,
};
