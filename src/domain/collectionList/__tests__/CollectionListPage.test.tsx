import { screen } from '@testing-library/react';
import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import {
  CollectionFieldsFragment,
  CollectionListDocument,
} from '../../../generated/graphql';
import { render } from '../../../util/testUtils';
import mockCollection from '../../collection/__mocks__/collection';
import CollectionListPage from '../CollectionListPage';

const collections: CollectionFieldsFragment[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
].map(id => ({
  ...mockCollection,
  __typename: 'CollectionDetails',
  id,
}));

const linkText = translations.commons.collectionCard.ariaLabelLink.replace(
  '{{title}}',
  mockCollection.title.fi || ''
);

const getMocks = (collections: CollectionFieldsFragment[]) => [
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
  const mocks = getMocks(collections);
  const { container } = render(<CollectionListPage />, { mocks });

  await screen.findByText(translations.collectionList.title);

  expect(screen.getAllByRole('link', { name: linkText }).length).toBe(7);

  expect(container.firstChild).toMatchSnapshot();
});

test('should not show collection if language is not supported', async () => {
  const mocks = getMocks(
    collections.map((collection, index) =>
      Object.assign(
        {},
        collection,
        index % 2 ? { title: { ...collection.title, fi: '' } } : {}
      )
    )
  );
  render(<CollectionListPage />, { mocks });

  await screen.findByText(translations.collectionList.title);

  expect(screen.getAllByRole('link', { name: linkText }).length).toBe(4);
});

test('should not show expired collections', async () => {
  const mocks = getMocks(
    collections.map((collection, index) =>
      Object.assign({}, collection, { expired: Boolean(index % 2) })
    )
  );
  render(<CollectionListPage />, { mocks });

  await screen.findByText(translations.collectionList.title);

  expect(screen.getAllByRole('link', { name: linkText }).length).toBe(4);
});
