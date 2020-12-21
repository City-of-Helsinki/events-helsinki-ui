import { IconSearch } from 'hds-react';
import React from 'react';

import { render, screen, userEvent } from '../../../../util/testUtils';
import IconLink from '../IconLink';

it('should show link text', () => {
  render(<IconLink icon={<IconSearch />} text="test" to="/test" />);

  expect(screen.getByText('test')).toBeInTheDocument();
});

it('should route to new location', async () => {
  const { container, history } = render(
    <IconLink icon={<IconSearch />} text="test" to="/test" />,
    { routes: ['/home'] }
  );

  expect(history.location.pathname).toBe('/home');

  userEvent.click(container.firstChild as Element);

  expect(history.location.pathname).toBe('/test');
});
