import React from 'react';

import { render } from '../../../../test/testUtils';
import PageLayout from '../PageLayout';

it('matched snapshot', () => {
  const { container } = render(
    <PageLayout>
      <div>PAGE</div>
    </PageLayout>
  );
  expect(container.firstChild).toMatchSnapshot();
});
