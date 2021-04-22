// eslint-disable-next-line import/no-unresolved
import { sleep } from 'k6';
// eslint-disable-next-line import/no-unresolved
import http from 'k6/http';
// eslint-disable-next-line import/no-unresolved
import { Options } from 'k6/options';

import {
  CollectionDetailsDocument,
  EventDetailsDocument,
  EventsByIdsDocument,
} from '../browser-tests/utils/generated/graphql';
import { BASE_URL, GRAPHQL_BASE_URL, loadUrlDocument } from './k6-utils';

export const options: Options = {
  duration: '1m',
  // number of virtual users
  vus: 2,
  thresholds: {
    //95 % of requests should be under 1 second
    http_req_duration: ['p(95)<1000'],
  },
};

const loadFrontPageDocument = () => loadUrlDocument('HOME');

const getRandomSelectionElement = (selectionCollection) => {
  const randomIndex = Math.floor(Math.random() * selectionCollection.size());
  return selectionCollection.get(randomIndex);
};

const getRandomElement = (list) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

const getRandomCollectionLinkAndSlug = (doc) => {
  const collections = doc.find('a[aria-label^="Siirry kokoelmaan"]');
  const link = getRandomSelectionElement(collections).getAttribute('href');
  return {
    slug: link.substring(link.lastIndexOf('/') + 1),
  };
};

const getEventIdFromUrl = (url) => {
  const match = url.match(/\/(?:events?)\/([^/?]*)/i);
  return match && match[1];
};

const loadGraphQlQuery = ({ operationName, variables, query }) => {
  const response = http.post(
    GRAPHQL_BASE_URL,
    JSON.stringify({
      operationName,
      variables,
      query,
    }),
    {
      headers: {
        referer: BASE_URL,
        accept: '*/*',
        'content-type': 'application/json',
      },
    }
  );
  return JSON.parse(response.body as string);
};

const loadCollectionPageCuratedEventIds = (slug) => {
  const { data } = loadGraphQlQuery({
    operationName: 'CollectionDetails',
    variables: { draft: false, slug },
    query: CollectionDetailsDocument,
  });
  return data.collectionDetails.curatedEvents
    .map(getEventIdFromUrl)
    .filter(Boolean);
};

const loadCuratedEvents = (eventIds) =>
  loadGraphQlQuery({
    operationName: 'EventsByIds',
    variables: {
      ids: eventIds,
      include: ['location'],
      source: 'LINKEDEVENTS',
    },
    query: EventsByIdsDocument,
  });

const loadEventPage = (eventId: string) => loadUrlDocument('EVENT', eventId);

const loadEventDetails = (eventId) =>
  loadGraphQlQuery({
    operationName: 'EventDetails',
    variables: {
      id: eventId,
      include: ['in_language', 'keywords', 'location', 'audience'],
    },
    query: EventDetailsDocument,
  });

const loadCollectionPage = (collectionSlug) => {
  // load collection page and its events
  loadUrlDocument('COLLECTION', collectionSlug);
  const curatedEventIds = loadCollectionPageCuratedEventIds(collectionSlug);
  loadCuratedEvents(curatedEventIds);
  return {
    curatedEventIds,
  };
};

const loadTestUserGoesToEventThroughCollection = () => {
  // load front page and pick up random collection
  const frontPage = loadFrontPageDocument();
  const { slug: collectionSlug } = getRandomCollectionLinkAndSlug(frontPage);
  const { curatedEventIds } = loadCollectionPage(collectionSlug);
  sleep(2);
  // if collection has non-expired events, pick randomly one and load event page
  if (curatedEventIds.length > 0) {
    const randomEventId = getRandomElement(curatedEventIds);
    // load random event page
    loadEventPage(randomEventId);
    loadEventDetails(randomEventId);
    sleep(2);
  }
};

export default (): void => {
  loadTestUserGoesToEventThroughCollection();
};
