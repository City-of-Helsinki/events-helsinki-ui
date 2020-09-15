import { render } from '@testing-library/react';
import * as React from 'react';

import mockLandingPage from '../../__mocks__/landingPage';
import LandingPageHero from '../LandingPageHero';

test('matches snapshot', () => {
  const { container } = render(
    <LandingPageHero landingPage={mockLandingPage} />
  );

  expect(container.firstChild).toMatchSnapshot();
});
