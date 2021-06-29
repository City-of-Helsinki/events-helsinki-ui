import { render } from '@testing-library/react';
import React from 'react';

import LinkedInShareLink from '../LinkedInShareLink';

const renderComponent = (props) => render(<LinkedInShareLink {...props} />);

test('should apply aria label', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  const { getByLabelText } = renderComponent({ sharedLink });

  expect(getByLabelText(/Jaa LinkedInissä/i)).toBeInTheDocument();
});

test('<LinkedInShareLink /> matches snapshot', () => {
  const sharedLink = 'https://helsinki.fi/some/';
  const { container } = renderComponent({ sharedLink });

  expect(container.firstChild).toMatchSnapshot();
});
