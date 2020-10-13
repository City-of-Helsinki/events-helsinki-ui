import { axe } from 'jest-axe';
import React from 'react';

import { render } from '../../../../util/testUtils';
import BottomFooter from '../BottomFooter';

test('component should be accessible', async () => {
  const { container } = render(<BottomFooter />);

  expect(await axe(container)).toHaveNoViolations();
});
