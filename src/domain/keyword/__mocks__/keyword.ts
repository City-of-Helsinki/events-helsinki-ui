import { KeywordFieldsFragment } from '../../../generated/graphql';

const keyword: KeywordFieldsFragment = {
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
};

export default keyword;
