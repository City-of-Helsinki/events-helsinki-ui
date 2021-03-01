import { MockedResponse } from '@apollo/react-testing';
import { clear } from 'console';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventListDocument } from '../../../../generated/graphql';
import { fakeEvents } from '../../../../util/mockDataUtils';
import { render, screen, userEvent, waitFor } from '../../../../util/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import SimilarEvents from '../SimilarEvents';

const expectedSimilarEvents = fakeEvents(3);

export const createMocks = (
  similarEvents = expectedSimilarEvents
): MockedResponse[] => [
  {
    request: {
      query: EventListDocument,
      variables: {
        audienceMinAgeGt: '',
        audienceMaxAgeLt: '',
        end: '',
        include: ['keywords', 'location'],
        isFree: undefined,
        keywordAnd: [],
        keywordOrSet1: ['keyword1', 'keyword2', 'keyword3'],
        keywordOrSet3: [],
        keywordNot: [],
        language: 'fi',
        location: [],
        pageSize: 10,
        publisher: null,
        sort: 'end_time',
        start: 'now',
        startsAfter: undefined,
        superEventType: ['umbrella', 'none'],
      },
    },
    result: { data: { eventList: similarEvents } },
  },
];

const mocks = createMocks();

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
  render(
    <SimilarEvents
      events={expectedSimilarEvents.data}
      eventsType="event"
      loading={false}
    />,
    { mocks }
  );
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
    <SimilarEvents
      events={expectedSimilarEvents.data}
      eventsType="event"
      loading={false}
    />,
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