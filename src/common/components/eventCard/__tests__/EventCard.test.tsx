import userEvent from '@testing-library/user-event';
import React from 'react';

import mockEvent from '../../../../domain/event/__mocks__/eventDetails';
import { render, screen } from '../../../../util/testUtils';
import translations from '../../../translation/i18n/fi.json';
import EventCard from '../EventCard';

it('matches snapshot', () => {
  const { container } = render(<EventCard event={mockEvent} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should go to event page', () => {
  const { history } = render(<EventCard event={mockEvent} />);

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.getByRole('button', {
      name: translations.commons.eventCard.ariaLabelLink.replace(
        '{{name}}',
        mockEvent.name.fi as string
      ),
    })
  );

  expect(history.location.pathname).toEqual(`/fi/event/${mockEvent.id}`);
});
