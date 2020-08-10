import * as React from 'react';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import mockCollection from '../../../../domain/collection/__mocks__/collection';
import CollectionCardContainer from '../CollectionCardContainer';

test('CollectionCardContainer matches snapshot', () => {
  const component = renderer.create(
    <MemoryRouter>
      <CollectionCardContainer collections={[mockCollection]} layout="lg" />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
