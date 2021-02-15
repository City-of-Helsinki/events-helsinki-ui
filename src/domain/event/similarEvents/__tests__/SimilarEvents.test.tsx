import { MockedResponse } from '@apollo/react-testing';
import { clear } from 'console';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventFieldsFragment,
  EventListDocument,
} from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeEvents,
  fakeKeywords,
} from '../../../../util/mockDataUtils';
import {
  CustomRenderResult,
  render,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../../util/testUtils';
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

export const createMocks = (
  rootEvent: EventFieldsFragment = event,
  similarEvents = expectedSimilarEvents
): MockedResponse[] => [
  {
    request: {
      query: EventListDocument,
      variables: {
        end: '',
        include: ['keywords', 'location'],
        isFree: undefined,
        keyword: rootEvent.keywords.map((keyword) => keyword.id),
        keywordAnd: [],
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

const waitForComponentToBeLoaded = async (render: () => CustomRenderResult) => {
  advanceTo(new Date('2020-08-11'));
  const result = render();
  await waitFor(() => {
    expect(
      screen.queryByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).toBeInTheDocument();
  });
  return result;
};

test('should render similar event cards', async () => {
  advanceTo(new Date('2020-08-11'));
  await waitForComponentToBeLoaded(() =>
    render(<SimilarEvents event={event} />, { mocks })
  );

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
  const { history } = await waitForComponentToBeLoaded(() =>
    renderWithRoute(<SimilarEvents event={event} />, {
      mocks,
      path,
      routes: [route],
    })
  );
  expectedSimilarEvents.data.forEach((similarEvent) => {
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
  });
});
