import { clear } from 'console';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { createEventListRequestAndResultMocks } from '../../../../test/apollo-mocks/eventListMocks';
import {
  fakeEvent,
  fakeEvents,
  fakeKeyword,
  fakeLocalizedObject,
  fakeTargetGroup,
} from '../../../../test/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../test/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import SimilarEvents from '../SimilarEvents';

const id = '1';
const name = 'Event title';
const description = 'Event description';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-05T10:00:00.000000Z';
const audience = ['Aikuiset', 'Lapset'];
const keywords = [
  { name: 'Avouinti', id: 'keyword1' },
  { name: 'Eläimet', id: 'keyword2' },
  { name: 'Grillaus', id: 'keyword3' },
];

const expectedSimilarEvents = fakeEvents(3);

const event = fakeEvent({
  id,
  startTime,
  endTime,
  name: fakeLocalizedObject(name),
  description: fakeLocalizedObject(description),
  keywords: keywords.map((k) =>
    fakeKeyword({ name: fakeLocalizedObject(k.name), id: k.id })
  ),
  audience: audience.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
});

const mocks = [
  createEventListRequestAndResultMocks({
    variables: {
      allOngoing: true,
      keywordOrSet1: ['keyword1', 'keyword2', 'keyword3'],
    },
    response: expectedSimilarEvents,
  }),
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
  render(<SimilarEvents event={event as EventFieldsFragment} />, {
    mocks,
  });
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
  const route = path.replace(':id', 'rootEventId');
  const { history } = render(
    <SimilarEvents event={event as EventFieldsFragment} />,
    {
      mocks,
      path,
      routes: [route],
    }
  );
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
