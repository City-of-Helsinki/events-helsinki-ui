import * as React from 'react';

import { render, screen, userEvent } from '../../../../test/testUtils';
import { skipFalsyType } from '../../../../util/typescript.utils';
import { ROUTES } from '../../routes/constants';
import Footer from '../Footer';

it('matches snapshot', () => {
  const { container } = render(<Footer />);

  expect(container.firstChild).toMatchSnapshot();
});

it('should route to right place when clicking links', async () => {
  const { history } = render(<Footer />);
  const pushSpy = jest.spyOn(history, 'push');

  const links = [
    {
      linkName: 'Tapahtumakalenteri',
      path: `/fi${ROUTES.EVENTS}`,
    },
    {
      linkName: 'Suosittelemme',
      path: `/fi${ROUTES.COLLECTIONS}`,
    },
  ].filter(skipFalsyType);

  for (const { linkName, path } of links) {
    userEvent.click(screen.getByRole('link', { name: linkName }));
    expect(pushSpy).toHaveBeenCalledWith(path);
    pushSpy.mockReset();
  }
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
    screen.queryByText(/suositut tapahtumien kategoriat/i)
  ).not.toBeInTheDocument();
});
