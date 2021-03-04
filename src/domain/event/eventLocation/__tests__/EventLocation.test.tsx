import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent, fakePlace } from '../../../../test/mockDataUtils';
import EventLocation from '../EventLocation';

const eventName = 'Event name';
const addressLocality = 'Helsinki';
const streetAddress = 'Testikatu 2';
const event = fakeEvent({
  location: fakePlace({
    addressLocality: { fi: addressLocality },
    streetAddress: { fi: streetAddress },
  }),
  name: { fi: eventName },
}) as EventFieldsFragment;

it('should render 1 mapLink and 2 directionsLink', () => {
  render(<EventLocation event={event} />);

  expect(
    screen.getByRole('link', { name: /avaa kartta uuteen ikkunaan/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /reittiohjeet \(hsl\)/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /reittiohjeet \(google\)/i })
  ).toBeInTheDocument();
});

it('should render event name', () => {
  render(<EventLocation event={event} />);

  expect(screen.getByText(eventName)).toBeInTheDocument();
});

it('should render location address', () => {
  render(<EventLocation event={event} />);

  expect(
    screen.getByText([streetAddress, addressLocality].join(', '))
  ).toBeInTheDocument();
});
