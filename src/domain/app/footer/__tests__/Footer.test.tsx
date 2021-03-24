import * as React from 'react';

import { setFeatureFlags } from '../../../../test/feature-flags/featureFlags.test.utils';
import { render, screen, userEvent } from '../../../../test/testUtils';
import { getFeatureFlags } from '../../../../util/featureFlags';
import { ROUTES } from '../../routes/constants';
import Footer from '../Footer';

describe('EVENTS_HELSINKI_2 feature flag', () => {
  [true, false].forEach((EVENTS_HELSINKI_2) => {
    setFeatureFlags({ EVENTS_HELSINKI_2 });
    it(`matches snapshot when EVENTS_HELSINKI_2 feature is ${
      EVENTS_HELSINKI_2 ? 'on' : 'off'
    }`, () => {
      const { container } = render(<Footer />);

      expect(container.firstChild).toMatchSnapshot();
    });

    it(`should route to right place when clicking links and EVENTS_HELSINKI_2 feature is ${
      EVENTS_HELSINKI_2 ? 'on' : 'off'
    }`, async () => {
      const { history } = render(<Footer />);
      const pushSpy = jest.spyOn(history, 'push');

      const testValues = [
        {
          linkName: 'Tapahtumat',
          path: `/fi${ROUTES.EVENTS}`,
        },
        ...[
          getFeatureFlags().EVENTS_HELSINKI_2 && {
            linkName: 'Harrastukset',
            path: `/fi${ROUTES.COURSES}`,
          },
        ],
        {
          linkName: 'Suosittelemme',
          path: `/fi${ROUTES.COLLECTIONS}`,
        },
      ].filter(Boolean);
      for (const { linkName, path } of testValues) {
        userEvent.click(screen.getByRole('link', { name: linkName }));
        expect(pushSpy).toHaveBeenCalledWith(path);
        pushSpy.mockReset();
      }
    });
  });
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
