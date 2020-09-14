import * as React from 'react';

import mockEvent from '../../__mocks__/eventDetails';
import { render } from '../../../../util/testUtils';
import EventHero from '../EventHero';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWrapper = (props: any) => render(<EventHero {...props} />);

test('matches snapshot', () => {
  const { container } = render(<EventHero event={mockEvent} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should hide buy button for free events', () => {
  const freeEventMockData = {
    ...mockEvent,
    offers: [
      {
        ...mockEvent.offers[0],
        infoUrl: 'some-url',
        isFree: true,
      },
    ],
  };
  const { queryByText } = getWrapper({ event: freeEventMockData });

  expect(queryByText('Osta lippu')).toEqual(null);
});
