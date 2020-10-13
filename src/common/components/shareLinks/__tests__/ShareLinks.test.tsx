import { render } from '@testing-library/react';
import React from 'react';

import ShareLinks, { ShareLinksProps } from '../ShareLinks';

const renderComponent = (props: ShareLinksProps) =>
  render(<ShareLinks {...props} />);

test('should have discoverable link address copy button as well as Facebook, Twitter and LinkedIn share links', () => {
  const { queryByLabelText } = renderComponent({ title: 'Jaa tapahtuma' });
  const shareLinkLabelsFI = [
    'Kopioi linkin osoite',
    'Jaa Facebookissa',
    'Jaa Twitterissä',
    'Jaa LinkedInissä',
  ];

  shareLinkLabelsFI.forEach((label) => {
    expect(queryByLabelText(label)).not.toEqual(null);
  });
});
