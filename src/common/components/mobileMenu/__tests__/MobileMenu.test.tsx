import React from 'react';

import { render } from '../../../../util/testUtils';
import MobileMenu from '../MobileMenu';

it('matches snapshot', () => {
  const { container } = render(
    <MobileMenu isMenuOpen={true} onClose={jest.fn()} />
  );
  expect(container.firstChild).toMatchSnapshot();
});
