import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import CollectionCard, { CollectionCardProps } from '../CollectionCard';

const collectionProps: CollectionCardProps = {
  backgroundImage: 'imageurl.png',
  count: 120,
  description: 'Lorem ipsum',
  size: 'md',
  slug: 'collection-title',
  title: 'Collection title',
};

it('matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <CollectionCard {...collectionProps} />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();
});
