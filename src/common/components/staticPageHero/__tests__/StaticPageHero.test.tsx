import { render } from '@testing-library/react';
import React from 'react';

import StaticPageHero from '../StaticPageHero';

test('matches snapshot', async () => {
  const { container } = render(<StaticPageHero>Test content</StaticPageHero>);

  expect(container.firstChild).toMatchSnapshot();
});
