import { addDays } from 'date-fns';
import FileSaver from 'file-saver';
import { range } from 'lodash';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventDetails,
  EventFieldsFragment,
  EventListQueryVariables,
  EventListResponse,
  EventTypeId,
  Meta,
  OrganizationDetailsDocument,
} from '../../../../generated/graphql';
import { createOtherEventTimesRequestAndResultMocks } from '../../../../test/apollo-mocks/eventListMocks';
import {
  fakeEvent,
  fakeEvents,
  fakeLocalizedObject,
  fakeOffer,
  fakeOrganization,
  fakeTargetGroup,
} from '../../../../test/mockDataUtils';
import {
  actWait,
  configure,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../../test/testUtils';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import { EventType, SuperEventResponse } from '../../types';
import EventInfo from '../EventInfo';
import { subEventsListTestId, superEventTestId } from '../EventsHierarchy';
configure({ defaultHidden: true });

const organizationId = '1';
const organizationName = 'Organization name';
const organization = fakeOrganization({
  id: organizationId,
  name: organizationName,
});
const organizationResponse = { data: { organizationDetails: organization } };

const superEventId = 'hel:123';
const superEventInternalId = `https://api.hel.fi/linkedevents/v1/event/${superEventId}`;
const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';
const email = 'test@email.com';
const telephone = '0441234567';
const addressLocality = 'Helsinki';
const district = 'Malmi';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const price = '12 €';
const targetGroups = ['lapset', 'aikuiset'];
const maximumAttendeeCapacity = 20;
const minimumAttendeeCapacity = 10;
const remainingAttendeeCapacity = 5;
const audienceMinAge = '5';
const audienceMaxAge = '15';
const organizerName = 'provider organisation';
const event = fakeEvent({
  audienceMinAge,
  audienceMaxAge,
  startTime,
  endTime,
  provider: { fi: organizerName },
  publisher: organizationId,
  location: {
    divisions: [{ name: { fi: district }, type: 'neighborhood' }],
    email,
    telephone: { fi: telephone },
    internalId: 'tprek:8740',
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
  },
  maximumAttendeeCapacity: maximumAttendeeCapacity,
  minimumAttendeeCapacity: minimumAttendeeCapacity,
  remainingAttendeeCapacity: remainingAttendeeCapacity,
  offers: [fakeOffer({ isFree: false, price: { fi: price } })],
  audience: targetGroups.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
}) as EventFieldsFragment;

const mocks = [
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: organizationId,
      },
    },
    result: organizationResponse,
  },
];

const getDateRangeStrProps = (event: EventDetails) => ({
  start: event.startTime,
  end: event.endTime,
  locale: 'fi',
  includeTime: true,
  timeAbbreviation: translations.commons.timeAbbreviation,
});

it('should render event info fields', async () => {
  render(<EventInfo event={event} eventType="event" />, { mocks });
  await actWait();

  const itemsByRole = [
    { role: 'heading', name: translations.event.info.labelDateAndTime },
    { role: 'heading', name: translations.event.info.labelLocation },
    { role: 'heading', name: translations.event.info.labelLanguages },
    { role: 'heading', name: translations.event.info.labelOtherInfo },
    { role: 'heading', name: translations.event.info.labelAudience },
    { role: 'heading', name: translations.event.info.labelPublisher },
    { role: 'heading', name: translations.event.info.labelOrganizer },
    {
      role: 'link',
      name: `${translations.event.info.extlinkFacebook} ${translations.commons.srOnly.opensInANewTab}`,
    },
    { role: 'heading', name: translations.event.info.labelDirections },
    {
      role: 'link',
      name: `${translations.event.location.directionsGoogle} ${translations.commons.srOnly.opensInANewTab}`,
    },
    {
      role: 'link',
      name: `${translations.event.location.directionsHSL} ${translations.commons.srOnly.opensInANewTab}`,
    },
    { role: 'heading', name: translations.event.info.labelPrice },
  ];

  itemsByRole.forEach(({ role, name }) => {
    expect(screen.queryByRole(role, { name })).toBeInTheDocument();
  });

  const itemsByText = [
    'Ma 22.6.2020, klo 10.00 – 13.00',
    addressLocality,
    locationName,
    streetAddress,
    email,
    telephone,
    organizationName,
    organizerName,
    price,
  ];

  itemsByText.forEach((item) => {
    expect(screen.queryByText(item)).toBeInTheDocument();
  });
});

it('should hide the organizer section when the organizer name is not given', async () => {
  const mockEvent = {
    ...event,
    provider: null,
  };
  render(<EventInfo event={mockEvent} eventType="event" />, { mocks });
  await actWait();
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelPublisher,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOrganizer,
    })
  ).not.toBeInTheDocument();
});

it('should hide other info section', () => {
  const mockEvent = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    location: {
      ...event.location,
      email: null,
      externalLinks: [],
      telephone: null,
    },
    extensionCourse: null,
    minimumAttendeeCapacity: null,
    maximumAttendeeCapacity: null,
    remainingAttendeeCapacity: null,
  };
  render(<EventInfo event={mockEvent} eventType="event" />, {
    mocks,
  });

  // Event info fields

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOtherInfo,
    })
  ).not.toBeInTheDocument();
  expect(screen.queryByText(email)).not.toBeInTheDocument();
  expect(screen.queryByText(telephone)).not.toBeInTheDocument();
});

it('should hide other info section registration url from external links', () => {
  const mockEvent = {
    ...event,
    externalLinks: [
      {
        name: 'registration',
        link: 'https://harrastushaku.fi/register/14302',
      },
    ],
    infoUrl: null,
    location: {
      ...event.location,
      email: null,
      externalLinks: [],
      telephone: null,
    },
    extensionCourse: null,
  };
  render(<EventInfo event={mockEvent} eventType="event" />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.registration,
    })
  ).not.toBeInTheDocument();
});

it('should hide the map link from location info if location is internet', () => {
  const mockEvent = {
    ...event,
    externalLinks: [],
    infoUrl: null,
    location: {
      ...event.location,
      id: 'helsinki:internet',
      email: null,
      externalLinks: [],
      telephone: null,
    },
    extensionCourse: null,
  };
  render(<EventInfo event={mockEvent} eventType="event" />, {
    mocks,
  });

  expect(
    screen.queryByRole('button', {
      name: translations.event.info.openMap,
    })
  ).not.toBeInTheDocument();
});

it('should open ticket buy page', async () => {
  global.open = jest.fn();
  render(<EventInfo event={event} eventType="event" />, { mocks });

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.ariaLabelBuyTickets,
    })
  );

  await waitFor(() => {
    expect(global.open).toBeCalled();
  });
});

it('should create ics file succesfully', async () => {
  FileSaver.saveAs = jest.fn();
  render(<EventInfo event={event} eventType="event" />, { mocks });

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.buttonAddToCalendar,
    })
  );

  await waitFor(() => {
    expect(FileSaver.saveAs).toBeCalled();
  });
});

it('should create ics file succesfully when end time is not defined', async () => {
  FileSaver.saveAs = jest.fn();
  render(<EventInfo event={{ ...event, endTime: null }} eventType="event" />, {
    mocks,
  });

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.buttonAddToCalendar,
    })
  );

  await waitFor(() => {
    expect(FileSaver.saveAs).toBeCalled();
  });
});

it('should show audience age info on signle course page', async () => {
  render(<EventInfo event={event} eventType="course" />, {
    routes: [`/fi/courses`],
  });

  await waitFor(() => {
    expect(screen.queryByText(/5-15 -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should show formatted audience age info on signle course page if min age is not specified', async () => {
  render(
    <EventInfo event={{ ...event, audienceMinAge: null }} eventType="course" />,
    {
      routes: [`/fi/courses`],
    }
  );

  await waitFor(() => {
    expect(screen.queryByText(/0-15 -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should show formatted audience age info on signle course page if max age is not specified', async () => {
  render(
    <EventInfo event={{ ...event, audienceMaxAge: null }} eventType="course" />,
    {
      routes: [`/fi/courses`],
    }
  );

  await waitFor(() => {
    expect(screen.queryByText(/5\+ -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should hide audience age info on single course page if min and max ages are not specified', async () => {
  render(
    <EventInfo
      event={{ ...event, audienceMinAge: null, audienceMaxAge: null }}
      eventType="course"
    />,
    {
      routes: [`/fi/courses`],
    }
  );

  await waitFor(() => {
    expect(screen.queryByText(/Ikäryhmä/i)).not.toBeInTheDocument();
  });
});

it('should hide audience age info on single event page', async () => {
  render(<EventInfo event={event} eventType="event" />, {
    routes: [`/fi/events`],
  });

  await waitFor(() => {
    expect(screen.queryByText(/Ikäryhmä/i)).not.toBeInTheDocument();
  });
});

describe('OrganizationInfo', () => {
  it.each<[EventType, string]>([
    ['event', 'Katso julkaisijan muut tapahtumat'],
    ['course', 'Katso julkaisijan muut harrastukset'],
  ])(
    'should show event type related providers link text in events info',
    async (eventType, linkText) => {
      render(<EventInfo event={event} eventType={eventType} />, { mocks });
      await actWait();
      expect(screen.queryByText(linkText)).toBeInTheDocument();
    }
  );
});

describe('superEvent', () => {
  it('should render super event title and link when super event is given', async () => {
    const superEvent = fakeEvent({
      superEvent: { internalId: superEventInternalId },
    });
    const superEventResponse = {
      data: superEvent,
      status: 'resolved',
    } as SuperEventResponse;
    const { history } = render(
      <EventInfo
        event={event}
        superEvent={superEventResponse}
        eventType="event"
      />,
      {
        mocks,
      }
    );
    await actWait();
    expect(
      screen.queryByRole('heading', {
        name: translations.event.superEvent.title,
      })
    ).toBeInTheDocument();

    userEvent.click(
      within(screen.getByTestId(superEventTestId)).getByText(superEvent.name.fi)
    );
    expect(history.location.pathname).toBe(`/fi/events/${superEvent.id}`);
  });

  it('should should not render super event title when super event is not given', async () => {
    render(<EventInfo event={event} eventType="event" />, {
      mocks,
    });
    await actWait();

    expect(
      screen.queryByRole('heading', {
        name: translations.event.superEvent.title,
      })
    ).not.toBeInTheDocument();
  });
});

describe('subEvents', () => {
  const meta: Meta = {
    count: 20,
    next:
      // eslint-disable-next-line max-len
      'https://api.hel.fi/linkedevents/v1/event/?include=keyword,location&page=2&sort=start_time&start=2020-08-11T03&super_event=hel:123',
    previous: null,
    __typename: 'Meta',
  };

  const subEventsResponse = {
    ...fakeEvents(
      10,
      range(1, 11).map((i) => ({
        endTime: addDays(new Date(endTime), i).toISOString(),
        startTime: addDays(new Date(startTime), i).toISOString(),
        typeId: i % 2 === 0 ? EventTypeId.Course : EventTypeId.General,
        superEvent: { internalId: superEventInternalId },
      }))
    ),
    meta,
  };

  const subEventsLoadMoreResponse = {
    ...fakeEvents(
      10,
      range(11, 21).map((i) => ({
        endTime: addDays(new Date(endTime), i).toISOString(),
        startTime: addDays(new Date(startTime), i).toISOString(),
        superEvent: { internalId: superEventInternalId },
      }))
    ),
    meta: { ...meta, next: null },
  };

  const getSubEventsMocks = ({
    eventType = 'event',
    response,
    variables,
  }: {
    eventType: EventType;
    response: EventListResponse;
    variables?: EventListQueryVariables;
  }) =>
    createOtherEventTimesRequestAndResultMocks({
      superEventId: event.id,
      response,
      variables,
      type: eventType,
    });

  const firstSubEventsLoadMock = getSubEventsMocks({
    eventType: 'event',
    response: subEventsResponse,
  });

  const secondSubEventsLoadMock = getSubEventsMocks({
    variables: { page: 2 },
    response: subEventsLoadMoreResponse,
    eventType: 'event',
  });

  const mocksWithSubEvents = [
    ...mocks,
    firstSubEventsLoadMock,
    secondSubEventsLoadMock,
  ];

  it('should render sub events title and content when sub events are given', async () => {
    render(<EventInfo event={event} eventType="event" />, {
      mocks: mocksWithSubEvents,
    });
    await actWait();
    expect(
      screen.queryByRole('heading', {
        name: translations.event.subEvents.title,
      })
    ).toBeInTheDocument();
    await testSubEvents();
  });

  it.each([
    [EventTypeId.General, '/fi/events/'],
    [EventTypeId.Course, '/fi/courses/'],
  ])(
    'should navigate to sub events page when it is clicked',
    async (eventTypeId: EventTypeId, url: string) => {
      const { history } = render(
        <EventInfo event={event} eventType="event" />,
        {
          mocks: mocksWithSubEvents,
        }
      );
      const eventsList = await screen.findByTestId(subEventsListTestId);
      const subEvent = subEventsResponse.data.find(
        (e) => e.typeId === eventTypeId
      );
      const dateStr = getDateRangeStr(getDateRangeStrProps(subEvent));

      userEvent.click(
        within(eventsList).queryByText(`${subEvent.name.fi} ${dateStr}`)
      );
      expect(history.location.pathname).toBe(`${url}${subEvent.id}`);
    }
  );

  it('should render subEvents with other times title when the event is a middle level event in event hierarchy', async () => {
    render(
      <EventInfo
        event={Object.assign({}, event, {
          superEvent: { internalId: 'super:123' },
          subEvents: [{ internalId: 'sub:123' }],
        })}
        eventType="event"
      />,
      {
        mocks: mocksWithSubEvents,
      }
    );
    await screen.findByRole('heading', {
      name: translations.event.otherTimes.title,
    });
    expect(
      screen.queryByRole('heading', {
        name: translations.event.subEvents.title,
      })
    ).not.toBeInTheDocument();
  });

  async function testSubEvents() {
    await waitFor(() => {
      expect(
        screen.queryByTestId('skeleton-loader-wrapper')
      ).not.toBeInTheDocument();
    });
    subEventsResponse.data.slice(0, 3).forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(
        screen.getByText(`${event.name.fi} ${dateStr}`)
      ).toBeInTheDocument();
    });
    const fourthevent = subEventsResponse.data[3];
    const fourthDateStr = getDateRangeStr(getDateRangeStrProps(fourthevent));
    expect(
      screen.queryByText(`${event.name.fi} ${fourthDateStr}`)
    ).not.toBeInTheDocument();

    const toggleButton = await screen.findByRole('button', {
      name: translations.event.relatedEvents.buttonShow,
    });

    userEvent.click(toggleButton);

    subEventsResponse.data.forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(
        screen.getByText(`${event.name.fi} ${dateStr}`)
      ).toBeInTheDocument();
    });
    subEventsLoadMoreResponse.data.forEach((event) => {
      const dateStr = getDateRangeStr(getDateRangeStrProps(event));
      expect(
        screen.getByText(`${event.name.fi} ${dateStr}`)
      ).toBeInTheDocument();
    });
  }
});
