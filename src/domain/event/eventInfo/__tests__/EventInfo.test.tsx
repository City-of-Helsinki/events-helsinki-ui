import FileSaver from 'file-saver';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventFieldsFragment,
  OrganizationDetailsDocument,
} from '../../../../generated/graphql';
import {
  fakeEvent,
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
} from '../../../../test/testUtils';
import EventInfo from '../EventInfo';
configure({ defaultHidden: true });

const organizationId = '1';
const organizationName = 'Organization name';
const organization = fakeOrganization({
  id: organizationId,
  name: organizationName,
});
const organizationResponse = { data: { organizationDetails: organization } };

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
const event = fakeEvent({
  audienceMinAge,
  audienceMaxAge,
  startTime,
  endTime,
  provider: null,
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
  extensionCourse: {
    maximumAttendeeCapacity: maximumAttendeeCapacity,
    minimumAttendeeCapacity: minimumAttendeeCapacity,
    remainingAttendeeCapacity: remainingAttendeeCapacity,
  },
  offers: [fakeOffer({ isFree: false, price: { fi: price } })],
  audience: targetGroups.map((targetGroup) =>
    fakeTargetGroup({ name: fakeLocalizedObject(targetGroup) })
  ),
}) as EventFieldsFragment;

it('should render event info fields', async () => {
  render(<EventInfo event={event} eventType="event" />, { mocks });
  await actWait();

  const itemsByRole = [
    { role: 'heading', name: translations.event.info.labelDateAndTime },
    { role: 'heading', name: translations.event.info.labelLocation },
    { role: 'heading', name: translations.event.info.labelLanguages },
    { role: 'heading', name: translations.event.info.labelOtherInfo },
    { role: 'heading', name: translations.event.info.labelAudience },
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
    { role: 'heading', name: translations.event.info.labelOrganizer },
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
    price,
  ];

  itemsByText.forEach((item) => {
    expect(screen.queryByText(item)).toBeInTheDocument();
  });
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
