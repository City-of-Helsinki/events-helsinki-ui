import * as React from 'react';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import CollectionCard from '../CollectionCard';

test('CollectionCard matches snapshot', () => {
  const component = renderer.create(
    <MemoryRouter>
      <CollectionCard
        backgroundImage={'imageurl.png'}
        count={120}
        description="Lorem ipsum"
        id="1"
        size="md"
        title="Test title"
      />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
