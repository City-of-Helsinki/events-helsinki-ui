import { clear } from 'console';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { createEventListRequestAndResultMocks } from '../../../../test/apollo-mocks/eventListMocks';
import {
  fakeEvent,
  fakeEvents,
  fakeKeywords,
} from '../../../../util/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../util/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import SimilarEvents from '../SimilarEvents';
const keywordIds = ['yso:1', 'yso:2'];

const keywords = fakeKeywords(
  keywordIds.length,
  keywordIds.map((id) => ({ id, name: { fi: id } }))
).data;
const event = fakeEvent({
  keywords,
}) as EventFieldsFragment;
const expectedSimilarEvents = fakeEvents(3);
const eventKeywords = event.keywords.map((keyword) => keyword.id);

const mocks = [
  createEventListRequestAndResultMocks(
    { allOngoing: true, keyword: eventKeywords },
    expectedSimilarEvents
  ),
];

afterAll(() => {
  clear();
});

const waitForComponentToBeLoaded = async () => {
  await waitFor(() => {
    expect(
      screen.queryByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).toBeInTheDocument();
  });
};

test('should render similar event cards', async () => {
  advanceTo(new Date('2020-08-11'));
  render(<SimilarEvents event={event} />, { mocks });
  await waitForComponentToBeLoaded();

  expectedSimilarEvents.data.forEach((event) => {
    expect(
      screen.queryByRole('link', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi
        ),
      })
    ).toBeInTheDocument();
  });
});

it('has return path on similar event link', async () => {
  const path = ROUTES.EVENT;
  const route = path.replace(':id', event.id);
  const { history } = render(<SimilarEvents event={event} />, {
    mocks,
    path,
    routes: [route],
  });
  for (const similarEvent of expectedSimilarEvents.data) {
    await waitForComponentToBeLoaded();
    userEvent.click(
      screen.queryByRole('button', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          similarEvent.name.fi
        ),
      })
    );
    expect(history.location).toMatchObject({
      pathname: `/fi${ROUTES.EVENT.replace(':id', similarEvent.id)}`,
      search: `?returnPath=${encodeURIComponent(route)}`,
    });
    history.goBack();
  }
});
