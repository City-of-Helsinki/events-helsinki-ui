import { render } from '@testing-library/react';
import * as React from 'react';

import TextWithLineBreaks from '../TextWithLineBreaks';

test('matches snapshot', () => {
  const text = `Line 1
  Line 2`;
  const { container } = render(<TextWithLineBreaks as="div" text={text} />);

  expect(container.firstChild).toMatchSnapshot();
});
