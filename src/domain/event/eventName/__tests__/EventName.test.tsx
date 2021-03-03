import { render, screen } from '@testing-library/react';
import React from 'react';

import { EVENT_STATUS } from '../../../../constants';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent } from '../../../../test/mockDataUtils';
import EventName from '../EventName';

const eventName = 'Event name fi';
const event = fakeEvent({ name: { fi: eventName } }) as EventFieldsFragment;

test('should render event name', async () => {
  const { container } = render(<EventName event={event} />);

  expect(container.innerHTML).toBe(eventName);
});

test('should tell that event has cancelled', async () => {
  render(
    <EventName
      event={{
        ...event,
        eventStatus: EVENT_STATUS.EVENT_CANCELLED,
      }}
    />
  );

  expect(screen.getByText(/tapahtuma peruttu/i)).toBeInTheDocument();
});
