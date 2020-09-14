/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';

import {
  EventDetails,
  EventListResponse,
  Image,
  InLanguage,
  Keyword,
  LocalizedObject,
  Place,
} from '../generated/graphql';

export const fakeEvents = (
  count = 1,
  events?: Partial<EventDetails>[]
): EventListResponse => ({
  data: generateNodeArray((i) => fakeEvent(events?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'EventListResponse',
});

export const fakeEvent = (overrides?: Partial<EventDetails>): EventDetails => {
  return {
    id: `hel:${faker.random.uuid()}`,
    internalId: faker.random.uuid(),
    name: fakeLocalizedObject(faker.name.title()),
    publisher: 'provider:123',
    provider: fakeLocalizedObject(),
    shortDescription: fakeLocalizedObject(),
    description: fakeLocalizedObject(),
    images: [fakeImage()],
    infoUrl: fakeLocalizedObject(),
    inLanguage: [fakeInLanguage()],
    audience: [],
    keywords: [fakeKeyword()],
    location: fakeLocation(),
    startTime: '2020-07-13T05:51:05.761000Z',
    endTime: null,
    datePublished: null,
    externalLinks: [] as any,
    offers: [] as any,
    subEvents: [] as any,
    eventStatus: 'EventScheduled',
    superEvent: null,
    dataSource: 'hel',
    __typename: 'EventDetails',
    ...overrides,
  };
};

export const fakeImage = (overrides?: Partial<Image>): Image => ({
  id: faker.random.uuid(),
  internalId: 'https://api.hel.fi/linkedevents-test/v1/image/48566/',
  license: 'cc_by',
  name: faker.random.words(),
  url: 'https://api.hel.fi/linkedevents-test/media/images/test.png',
  cropping: '59,0,503,444',
  photographerName: faker.name.firstName(),
  __typename: 'Image',
  ...overrides,
});

export const fakeInLanguage = (overrides?: InLanguage): InLanguage => ({
  id: 'fi',
  internalId: 'https://api.hel.fi/linkedevents-test/v1/language/fi/',
  name: {
    en: null,
    fi: 'suomi',
    sv: null,
    __typename: 'LocalizedObject',
  },
  __typename: 'InLanguage',
  ...overrides,
});

export const fakeLocation = (overrides?: Partial<Place>): Place => ({
  id: faker.random.uuid(),
  internalId: 'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
  name: fakeLocalizedObject(),
  streetAddress: fakeLocalizedObject(),
  addressLocality: fakeLocalizedObject(),
  postalCode: faker.address.zipCode(),
  hasUpcomingEvents: true,
  telephone: fakeLocalizedObject(),
  email: faker.internet.email(),
  infoUrl: fakeLocalizedObject(faker.internet.url()),
  position: null,
  divisions: [],
  __typename: 'Place',
  ...overrides,
});

export const fakeKeyword = (overrides?: Partial<Keyword>): Keyword => ({
  id: faker.random.uuid(),
  dataSource: 'yso',
  hasUpcomingEvents: true,
  name: {
    en: 'families',
    fi: 'perheet',
    sv: 'familjer',
    __typename: 'LocalizedObject',
  },
  internalId: 'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
  __typename: 'Keyword',
  ...overrides,
});

export const fakeLocalizedObject = (text?: string): LocalizedObject => ({
  __typename: 'LocalizedObject',
  en: faker.random.words(),
  sv: faker.random.words(),
  fi: text || faker.random.words(),
});

const generateNodeArray = <T extends (...args: any) => any>(
  fakeFunc: T,
  length: number
): ReturnType<T>[] => {
  return Array.from({ length }).map((_, i) => fakeFunc(i));
};
