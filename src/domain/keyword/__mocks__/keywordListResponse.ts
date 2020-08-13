/* eslint-disable sort-keys */
const keywordListResponse = {
  data: {
    keywordList: {
      meta: {
        count: 6,
        next:
          'https://api.hel.fi/linkedevents/v1/keyword/?has_upcoming_events=true&page=2&page_size=5&text=jazz',
        previous: null,
        __typename: 'Meta',
      },
      data: [
        {
          id: 'yso:p20421',
          internalId: 'https://api.hel.fi/linkedevents/v1/keyword/yso:p20421/',
          dataSource: 'yso',
          hasUpcomingEvents: null,
          name: {
            fi: 'musiikkiklubit',
            sv: 'musikklubbar',
            en: 'music clubs',
            __typename: 'LocalizedObject',
          },
          __typename: 'Keyword',
        },
        {
          id: 'yso:p4484',
          internalId: 'https://api.hel.fi/linkedevents/v1/keyword/yso:p4484/',
          dataSource: 'yso',
          hasUpcomingEvents: null,
          name: {
            fi: 'jazz',
            sv: 'jazz',
            en: 'jazz',
            __typename: 'LocalizedObject',
          },
          __typename: 'Keyword',
        },
        {
          id: 'yso:p30059',
          internalId: 'https://api.hel.fi/linkedevents/v1/keyword/yso:p30059/',
          dataSource: 'yso',
          hasUpcomingEvents: null,
          name: {
            fi: 'afrokuubalainen jazz',
            sv: 'afrokubansk jazz',
            en: 'Afro-Cuban jazz',
            __typename: 'LocalizedObject',
          },
          __typename: 'Keyword',
        },
        {
          id: 'yso:p14255',
          internalId: 'https://api.hel.fi/linkedevents/v1/keyword/yso:p14255/',
          dataSource: 'yso',
          hasUpcomingEvents: null,
          name: {
            fi: 'free jazz',
            sv: 'frijazz',
            en: 'free jazz',
            __typename: 'LocalizedObject',
          },
          __typename: 'Keyword',
        },
        {
          id: 'yso:p6283',
          internalId: 'https://api.hel.fi/linkedevents/v1/keyword/yso:p6283/',
          dataSource: 'yso',
          hasUpcomingEvents: null,
          name: {
            fi: 'jazztanssi',
            sv: 'jazzdans',
            en: 'jazz dance',
            __typename: 'LocalizedObject',
          },
          __typename: 'Keyword',
        },
      ],
      __typename: 'KeywordListResponse',
    },
  },
};

export default keywordListResponse;
