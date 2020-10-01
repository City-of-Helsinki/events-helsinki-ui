import React from 'react';

import { render } from '../../../../../../util/testUtils';
import MobileNavbar from '../MobileNavbar';

it('MobileNavbar matches snapshot', () => {
  const { container } = render(
    <MobileNavbar
      isMenuOpen={true}
      onCloseMenu={jest.fn()}
      onOpenMenu={jest.fn()}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
