import React from 'react';

import { render } from '../../../../util/testUtils';
import PageLayout from '../PageLayout';

it('matched snapshot', () => {
  const { container } = render(
    <PageLayout>
      <div>PAGE</div>
    </PageLayout>
  );
  expect(container.firstChild).toMatchSnapshot();
});
