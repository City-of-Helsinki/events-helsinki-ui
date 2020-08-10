import { shallow } from 'enzyme';
import React from 'react';
import routeData, { MemoryRouter } from 'react-router';

import MobileNavigation from '../MobileNavigation';

const mockLocation = {
  hash: '',
  pathname: '/fi/home',
  search: '',
  state: '',
};
beforeEach(() => {
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
});

it('MobileNavigation matches snapshot', () => {
  const container = shallow(
    <MemoryRouter>
      <MobileNavigation />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
