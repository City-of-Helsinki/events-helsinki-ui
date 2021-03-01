import * as React from 'react';

import { render, screen, userEvent } from '../../../../test/testUtils';
import { ROUTES } from '../../routes/constants';
import Footer from '../Footer';

test('matches snapshot', () => {
  const { container } = render(<Footer />);

  expect(container.firstChild).toMatchSnapshot();
});

test.only('clicking links should route to right place', () => {
  const { history } = render(<Footer />);
  const pushSpy = jest.spyOn(history, 'push');

  const testValues = [
    {
      linkName: 'Tapahtumat',
      path: `/fi${ROUTES.EVENTS}`,
    },
    {
      linkName: 'Harrastukset',
      path: `/fi${ROUTES.COURSES}`,
    },
    {
      linkName: 'Suosittelemme',
      path: `/fi${ROUTES.COLLECTIONS}`,
    },
  ];

  for (const { linkName, path } of testValues) {
    userEvent.click(screen.getByRole('link', { name: linkName }));
    expect(pushSpy).toHaveBeenCalledWith(path);
    pushSpy.mockReset();
  }
});
