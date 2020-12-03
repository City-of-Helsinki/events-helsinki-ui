import { MAPPED_PLACES } from '../../eventSearch/constants';

// Remember also update static urls to updateSitemap
export const ROUTES = {
  ABOUT: '/about',
  ACCESSIBILITY: '/accessibility',
  COLLECTION: '/collection/:slug',
  COLLECTIONS: '/collections',
  EVENTS: '/events',
  EVENT: '/event/:id',
  HOME: '/home',
  HOME_PREVIEW: '/home/:id',
  EVENT_PLACE: `/:place(${Object.keys(MAPPED_PLACES).join('|')})`,
};
