import React from 'react';

import { CollectionFieldsFragment } from '../../../../generated/graphql';
import { fakeCollections } from '../../../../util/mockDataUtils';
import { render, screen } from '../../../../util/testUtils';
import CollectionCards from '../CollectionCards';

const collectionNames = [
  'Collection 1',
  'Collection 2',
  'Collection 3',
  'Collection 4',
  'Collection 5',
  'Collection 6',
  'Collection 7',
];

const collections = fakeCollections(
  collectionNames.length,
  collectionNames.map((collection) => ({ title: { fi: collection } }))
);

const collectionsData = collections.data as CollectionFieldsFragment[];

it('should render lg collection cards', () => {
  render(<CollectionCards collections={collectionsData} layout="lg" />);

  collectionsData.forEach((collection) => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: new RegExp(collection.title.fi, 'i') })
    ).toHaveClass('lgSize');
  });
});

it('should render correct sizes collection cards for mdAndSm layout', () => {
  render(<CollectionCards collections={collectionsData} layout="mdAndSm" />);

  collectionsData.forEach((collection, index) => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
    if (index % 5 === 0 || index % 5 === 4) {
      expect(
        screen.getByRole('link', { name: new RegExp(collection.title.fi, 'i') })
      ).toHaveClass('mdSize');
    } else {
      expect(
        screen.getByRole('link', { name: new RegExp(collection.title.fi, 'i') })
      ).toHaveClass('smSize');
    }
  });
});
