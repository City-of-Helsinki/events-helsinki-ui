import FileSaver from 'file-saver';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventDetails } from '../../../../generated/graphql';
import { fakeEvent } from '../../../../test/mockDataUtils';
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
import { SuperEventResponse } from '../../types';
import EventInfo from '../EventInfo';
import { subEventsListTestId, superEventTestId } from '../EventsHierarchy';
import {
  addressLocality,
  email,
  event,
  locationName,
  mocks,
  mocksWithSubEvents,
  organizationName,
  organizerName,
  price,
  streetAddress,
  subEventsLoadMoreResponse,
  subEventsResponse,
  superEventInternalId,
  telephone,
} from '../utils/EventInfo.mocks';
configure({ defaultHidden: true });

const getDateRangeStrProps = (event: EventDetails) => ({
  start: event.startTime,
  end: event.endTime,
  locale: 'fi',
  includeTime: true,
  timeAbbreviation: translations.commons.timeAbbreviation,
});

it('should render event info fields', async () => {
  render(<EventInfo event={event} />, { mocks });
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
  render(<EventInfo event={mockEvent} />, { mocks });
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
  };
  render(<EventInfo event={mockEvent} />, {
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
  };
  render(<EventInfo event={mockEvent} />, {
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
  };
  render(<EventInfo event={mockEvent} />, {
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
  render(<EventInfo event={event} />, { mocks });

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
  render(<EventInfo event={event} />, { mocks });

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
  render(<EventInfo event={{ ...event, endTime: null }} />, {
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

it('should hide audience age info on single event page', async () => {
  render(<EventInfo event={event} />, {
    routes: [`/fi/events`],
  });

  await waitFor(() => {
    expect(screen.queryByText(/5-15 -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should show formatted audience age info on signle event page if max age is not specified', async () => {
  render(<EventInfo event={{ ...event, audienceMaxAge: null }} />, {
    routes: [`/fi/events`],
  });

  await waitFor(() => {
    expect(screen.queryByText(/5\+ -vuotiaat/i)).toBeInTheDocument();
  });
});

it('should hide audience age info on single event page if min and max ages are not specified', async () => {
  render(
    <EventInfo
      event={{ ...event, audienceMinAge: null, audienceMaxAge: null }}
    />,
    {
      routes: [`/fi/events`],
    }
  );

  await waitFor(() => {
    expect(screen.queryByText(/-vuotiaat/i)).not.toBeInTheDocument();
  });
});

describe('OrganizationInfo', () => {
  it('should show event type related providers link text in events info', async () => {
    render(<EventInfo event={event} />, { mocks });
    await actWait();
    expect(
      screen.queryByText('Katso julkaisijan muut tapahtumat')
    ).toBeInTheDocument();
  });
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
      <EventInfo event={event} superEvent={superEventResponse} />,
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
    render(<EventInfo event={event} />, {
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
  it('should render sub events title and content when sub events are given', async () => {
    render(<EventInfo event={event} />, {
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

  it('should navigate to sub events page when it is clicked', async () => {
    const { history } = render(<EventInfo event={event} />, {
      mocks: mocksWithSubEvents,
    });
    const eventsList = await screen.findByTestId(subEventsListTestId);
    const subEvent = subEventsResponse.data[0];
    const dateStr = getDateRangeStr(getDateRangeStrProps(subEvent));

    userEvent.click(
      within(eventsList).queryByText(`${subEvent.name.fi} ${dateStr}`)
    );
    expect(history.location.pathname).toBe(`${'/fi/events/'}${subEvent.id}`);
  });

  it('should render subEvents with other times title when the event is a middle level event in event hierarchy', async () => {
    render(
      <EventInfo
        event={Object.assign({}, event, {
          superEvent: { internalId: 'super:123' },
          subEvents: [{ internalId: 'sub:123' }],
        })}
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
