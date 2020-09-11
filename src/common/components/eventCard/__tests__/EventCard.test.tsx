import React from 'react';

import mockEvent from '../../../../domain/event/__mocks__/eventDetails';
import { render } from '../../../../util/testUtils';
import EventCard from '../EventCard';

it('matches snapshot', () => {
  const { container } = render(<EventCard event={mockEvent} />);

  expect(container.firstChild).toMatchSnapshot();
});
