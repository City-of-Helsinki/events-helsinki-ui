import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import mockEvent from '../../__mocks__/eventDetails';
import EventKeywords from '../EventKeywords';

it('EventKeywords matches snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <EventKeywords event={mockEvent} showIsFree={true} />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
