import React from 'react';

import { render } from '../../../../util/testUtils';
import EventClosedHero from '../EventClosedHero';

it('matches snapshot', () => {
  const { container } = render(<EventClosedHero />);

  expect(container.firstChild).toMatchSnapshot();
});
