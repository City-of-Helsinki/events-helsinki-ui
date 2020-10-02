import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvents } from '../../../../util/mockDataUtils';
import { render, screen, userEvent } from '../../../../util/testUtils';
import EventCards from '../EventCards';

const eventsResponse = fakeEvents(4);
const events = eventsResponse.data as EventFieldsFragment[];

test('should show fields for each event card', async () => {
  render(<EventCards events={events} />);

  events.forEach((event) => {
    expect(screen.getByText(event.name.fi));
    expect(
      screen.getByText(
        `${event.location.name.fi}, ${event.location.streetAddress.fi}, ${event.location.addressLocality.fi}`
      )
    );
  });
});

test('should call onShowMore', async () => {
  const onShowMore = jest.fn();
  render(
    <EventCards events={events} onShowMore={onShowMore} showMoreButton={true} />
  );

  userEvent.click(
    screen.getByText(translations.collection.buttonShowAllPastEvents)
  );
  expect(onShowMore).toBeCalledTimes(1);
});
