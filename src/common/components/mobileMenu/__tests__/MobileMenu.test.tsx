import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import MobileMenu from '../MobileMenu';

it('MobileMenu matches snapshot', () => {
  const container = shallow(
    <MemoryRouter>
      <MobileMenu isMenuOpen={true} onClose={jest.fn()} />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
