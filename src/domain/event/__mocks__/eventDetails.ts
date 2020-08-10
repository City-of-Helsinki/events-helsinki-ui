import { EventFieldsFragment } from '../../../generated/graphql';

const eventDetails: EventFieldsFragment = {
  __typename: 'EventDetails',
  description: {
    __typename: 'LocalizedObject',
    en: 'description en',
    fi: 'description fi',
    sv: 'description sv',
  },
  endTime: null,
  eventStatus: 'EventScheduled',
  externalLinks: [
    {
      __typename: 'ExternalLink',
      link: 'https://www.facebook.com/events/12345687/',
      name: 'extlink_facebook',
    },
  ],
  id: '123',
  images: [
    {
      __typename: 'Image',
      id: '60578',
      name: 'piha-2.jpg',
      url: 'https://api.hel.fi/linkedevents/media/images/piha-2_yYlCdPB.jpg',
    },
  ],
  inLanguage: [
    {
      __typename: 'InLanguage',
      name: {
        __typename: 'LocalizedObject',
        en: 'Finnish',
        fi: 'suomi',
        sv: 'finska',
      },
    },
  ],
  infoUrl: {
    __typename: 'LocalizedObject',
    en:
      'https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2640080',
    fi:
      'https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2640080',
    sv:
      'https://www.lippu.fi/tickets.html?affiliate=adv&doc=erdetaila&fun=erdetail&erid=2640080',
  },
  keywords: [
    {
      __typename: 'Keyword',
      dataSource: 'yso',
      hasUpcomingEvents: false,
      id: 'yso:1',
      internalId: 'yso:1',
      name: {
        __typename: 'LocalizedObject',
        en: 'Keyword 1 en',
        fi: 'Keyword 1 fi',
        sv: 'Keyword 1 sv',
      },
    },
    {
      __typename: 'Keyword',
      dataSource: 'yso',
      hasUpcomingEvents: false,
      id: 'yso:2',
      internalId: 'yso:2',
      name: {
        __typename: 'LocalizedObject',
        en: 'Keyword 2 en',
        fi: 'Keyword 2 fi',
        sv: 'Keyword 2 sv',
      },
    },
  ],
  location: {
    __typename: 'Place',
    addressLocality: {
      __typename: 'LocalizedObject',
      en: 'locality en',
      fi: 'locality fi',
      sv: 'locality sv',
    },
    divisions: [],
    email: 'location@info.com',
    hasUpcomingEvents: false,
    id: 'tprek:123',
    infoUrl: {
      __typename: 'LocalizedObject',
      en: 'http://www.infourl.com',
      fi: 'http://www.infourl.com',
      sv: 'http://www.infourl.com',
    },
    internalId: 'tprek:123',
    name: {
      __typename: 'LocalizedObject',
      en: 'name en',
      fi: 'name fi',
      sv: 'name sv',
    },
    position: {
      __typename: 'PlacePosition',
      coordinates: [25.01497, 60.250507],
    },
    postalCode: '01234',
    streetAddress: {
      __typename: 'LocalizedObject',
      en: 'streetAddress en',
      fi: 'streetAddress fi',
      sv: 'streetAddress sv',
    },
    telephone: {
      __typename: 'LocalizedObject',
      en: '044 123 4567',
      fi: '044 123 4567',
      sv: '044 123 4567',
    },
  },
  name: {
    __typename: 'LocalizedObject',
    en: 'name en',
    fi: 'name fi',
    sv: 'name sv',
  },
  offers: [
    {
      __typename: 'Offer',
      description: null,
      infoUrl: null,
      isFree: true,
      price: null,
    },
  ],
  provider: null,
  publisher: 'provider:123',
  shortDescription: {
    __typename: 'LocalizedObject',
    en: 'short description en',
    fi: 'short description fi',
    sv: 'short description sv',
  },
  startTime: '2019-12-13T08:00:00Z',
  superEvent: null,
};

export default eventDetails;
