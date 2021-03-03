import { render } from '@testing-library/react';
import * as React from 'react';

import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent, fakePlace } from '../../../../test/mockDataUtils';
import EventLocationText from '../EventLocationText';

const addressLocality = 'Helsinki';
const locationName = 'Testi paikka';
const streetAddress = 'testikuja 1';

const event = fakeEvent({
  location: fakePlace({
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
  }),
}) as EventFieldsFragment;

test('should render event location text', () => {
  const { container } = render(
    <EventLocationText
      event={event}
      showDistrict={true}
      showLocationName={true}
    />
  );

  expect(container.innerHTML).toBe(
    [locationName, streetAddress, addressLocality].join(', ')
  );
});
