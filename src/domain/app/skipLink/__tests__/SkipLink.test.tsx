import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { render, screen } from '../../../../util/testUtils';
import SkipLink from '../SkipLink';

test('matches snapshot', () => {
  const { container } = render(<SkipLink />);

  expect(
    screen.getByRole('link', { name: translations.commons.linkSkipToContent })
  ).toBeInTheDocument();

  expect(container.innerHTML).toMatchSnapshot();
});
