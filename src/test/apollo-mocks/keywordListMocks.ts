import { MockedResponse } from '@apollo/react-testing';

import { KeywordListDocument } from '../../generated/graphql';
import { fakeKeywords } from '../mockDataUtils';

export const getKeywordListMock = (
  searchValue: string,
  expectedKeywords: string[]
): MockedResponse[] => [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        text: searchValue,
      },
    },
    result: {
      data: {
        keywordList: fakeKeywords(
          expectedKeywords.length,
          expectedKeywords.map((keyword) => ({ name: { fi: keyword } }))
        ),
      },
    },
  },
];
