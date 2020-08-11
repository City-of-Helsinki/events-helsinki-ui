import { render } from '@testing-library/react';
import React from 'react';

import SrOnly from '../SrOnly';

it('matches snapshot', () => {
  const { container, rerender } = render(
    <SrOnly className="test">
      <div>Test</div>
    </SrOnly>
  );

  expect(container.firstChild).toMatchSnapshot();

  rerender(
    <SrOnly as="span">
      <div>Test</div>
    </SrOnly>
  );
  expect(container.firstChild).toMatchSnapshot();
});
