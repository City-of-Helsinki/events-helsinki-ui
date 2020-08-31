import React from 'react';
import { MemoryRouter } from 'react-router';

import { render } from '../../../../../util/testUtils';
import MobileHeader from '../MobileHeader';

it('matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <MobileHeader />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
