import { MockedProvider } from '@apollo/react-testing';
import * as React from 'react';
import renderer from 'react-test-renderer';

import mockKeyword from '../../../../domain/keyword/__mocks__/keyword';
import { KeywordListDocument } from '../../../../generated/graphql';
import SearchAutosuggest from '../SearchAutosuggest';

const mocks = [
  {
    request: {
      query: KeywordListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 5,
        text: 'search value',
      },
    },
    result: {
      data: {
        keywordList: {
          __typename: 'KeywordListResponse',
          data: [mockKeyword],
        },
      },
    },
  },
];

test('SearchAutosuggest matches snapshot', () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={true}>
      <SearchAutosuggest
        categories={[{ text: 'bar', value: 'foo' }]}
        name="search"
        onRemoveCategory={category => {}}
        onChangeSearchValue={value => {}}
        onOptionClick={() => {}}
        placeholder="Lorem ipsum"
        searchValue={'search value'}
      />
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
