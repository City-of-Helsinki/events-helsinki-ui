import { MAPPED_PLACES } from '../../eventSearch/constants';

// Remember also update static urls to updateSitemap
export type ROUTE_TYPES = {
  ABOUT: '/about';
  ACCESSIBILITY: '/accessibility';
  COLLECTION: '/collection/:slug';
  COLLECTIONS: '/collections';
  EVENTS: '/events';
  EVENT: '/event/:id';
  COURSES: '/courses';
  COURSE: '/course/:id';
  HOME: '/home';
  HOME_PREVIEW: '/home/:id';
  EVENT_PLACE: string;
};

export const ROUTES: ROUTE_TYPES = {
  ABOUT: '/about',
  ACCESSIBILITY: '/accessibility',
  COLLECTION: '/collection/:slug',
  COLLECTIONS: '/collections',
  EVENTS: '/events',
  EVENT: '/event/:id',
  COURSES: '/courses',
  COURSE: '/course/:id',
  HOME: '/home',
  HOME_PREVIEW: '/home/:id',
  EVENT_PLACE: `/:place(${Object.keys(MAPPED_PLACES).join('|')})`,
};
