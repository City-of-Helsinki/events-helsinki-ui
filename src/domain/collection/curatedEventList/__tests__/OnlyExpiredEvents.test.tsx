import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import OnlyExpiredEvents from '../OnlyExpiredEvents';

it('matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <OnlyExpiredEvents />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();
});
