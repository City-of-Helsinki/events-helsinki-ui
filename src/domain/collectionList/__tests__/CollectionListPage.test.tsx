import { screen } from '@testing-library/react';
import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import { CollectionListDocument } from '../../../generated/graphql';
import { render } from '../../../util/testUtils';
import mockCollection from '../../collection/__mocks__/collection';
import CollectionListPage from '../CollectionListPage';

const collections = ['1', '2', '3', '4', '5', '6', '7'].map(id => ({
  ...mockCollection,
  __typename: 'CollectionDetails',
  id,
}));

const mocks = [
  {
    request: {
      query: CollectionListDocument,
    },
    result: {
      data: {
        collectionList: {
          __typename: 'CollectionListResponse',
          data: collections,
        },
      },
    },
  },
];

test('matches snapshot', async () => {
  const { container } = render(<CollectionListPage />, { mocks });

  await screen.findByText(translations.collectionList.title);
  expect(container.firstChild).toMatchSnapshot();
});
