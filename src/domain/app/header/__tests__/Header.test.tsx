import { axe } from 'jest-axe';
import * as React from 'react';

import { render } from '../../../../util/testUtils';
import Header, { HeaderProps } from '../Header';

const defaultProps: HeaderProps = {
  menuOpen: false,
  onMenuToggle: jest.fn(),
};
const renderComponent = (props?: Partial<HeaderProps>, route = '/fi') =>
  render(<Header {...defaultProps} {...props} />, { routes: [route] });

it('component should be accessible', async () => {
  const { container } = renderComponent();

  expect(await axe(container)).toHaveNoViolations();
});
