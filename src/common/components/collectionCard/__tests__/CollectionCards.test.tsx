import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';

import mockCollection from '../../../../domain/collection/__mocks__/collection';
import CollectionCardContainer from '../CollectionCardContainer';

const collections = ['1', '2', '3', '4', '5', '6', '7'].map(id => ({
  ...mockCollection,
  id,
}));

it('matches snapshot', () => {
  const { container, rerender } = render(
    <MemoryRouter>
      <CollectionCardContainer collections={collections} layout="lg" />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();

  rerender(
    <MemoryRouter>
      <CollectionCardContainer collections={collections} layout="md" />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();

  rerender(
    <MemoryRouter>
      <CollectionCardContainer collections={collections} layout="mdAndSm" />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();

  rerender(
    <MemoryRouter>
      <CollectionCardContainer collections={collections} layout="sm" />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();
});
