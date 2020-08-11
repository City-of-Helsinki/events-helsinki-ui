import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import EventClosedHero from '../EventClosedHero';

it('matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <EventClosedHero />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();
});
