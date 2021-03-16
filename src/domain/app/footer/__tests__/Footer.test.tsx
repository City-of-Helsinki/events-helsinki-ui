import * as React from 'react';

import { render, screen, userEvent } from '../../../../test/testUtils';
import { ROUTES } from '../../routes/constants';
import Footer from '../Footer';

test('matches snapshot', () => {
  const { container } = render(<Footer />);

  expect(container.firstChild).toMatchSnapshot();
});

test('clicking links should route to right place', () => {
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

test('should show courses footer title', () => {
  render(<Footer />, {
    routes: [`/fi/courses`],
  });
  expect(
    screen.queryByText(/suositut harrastuskategoriat/i)
  ).toBeInTheDocument();
});

test('should show events footer title', () => {
  render(<Footer />, {
    routes: [`/fi/events`],
  });
  expect(
    screen.queryByText(/suositut tapahtumien kategoriat/i)
  ).toBeInTheDocument();
});

test('should not show footer title', () => {
  render(<Footer />, {
    routes: [`/fi/home`],
  });
  expect(
    screen.queryByText(/suositut harrastuskategoriat/i)
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(/suositut tapahtumien kategoriat/i)
  ).not.toBeInTheDocument();
});
