import FileSaver from 'file-saver';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventFieldsFragment,
  OrganizationDetailsDocument,
} from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeOffer,
  fakeOrganization,
} from '../../../../util/mockDataUtils';
import {
  actWait,
  configure,
  render,
  screen,
  userEvent,
} from '../../../../util/testUtils';
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
const event = fakeEvent({
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
  offers: [fakeOffer({ isFree: false, price: { fi: price } })],
}) as EventFieldsFragment;

it('should render event info fields', async () => {
  render(<EventInfo event={event} />, { mocks });
  await actWait();

  // Event info fields
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelDateAndTime,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByText('Ma 22.6.2020, klo 10.00 – 13.00')
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelLocation,
    })
  ).toBeInTheDocument();

  expect(screen.queryByText(addressLocality)).toBeInTheDocument();
  expect(screen.queryByText(district)).toBeInTheDocument();
  expect(screen.queryByText(locationName)).toBeInTheDocument();
  expect(screen.queryByText(streetAddress)).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelLanguages,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOtherInfo,
    })
  ).toBeInTheDocument();
  expect(screen.queryByText(email)).toBeInTheDocument();
  expect(screen.queryByText(telephone)).toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: translations.event.info.extlinkFacebook,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelDirections,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: translations.event.location.directionsGoogle,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: translations.event.location.directionsHSL,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOrganizer,
    })
  ).toBeInTheDocument();
  expect(screen.queryByText(organizationName)).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelPrice,
    })
  ).toBeInTheDocument();
  expect(screen.queryByText(price)).toBeInTheDocument();
});

it('should hide other info section', async () => {
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
  render(<EventInfo event={mockEvent} />, { mocks });
  await actWait();

  // Event info fields

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelOtherInfo,
    })
  ).not.toBeInTheDocument();
  expect(screen.queryByText(email)).not.toBeInTheDocument();
  expect(screen.queryByText(telephone)).not.toBeInTheDocument();
});

it('should open ticket buy page', async () => {
  global.open = jest.fn();
  render(<EventInfo event={event} />, { mocks });
  await actWait();

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.ariaLabelBuyTickets,
    })
  );

  expect(global.open).toBeCalled();
});

it('should create ics file succesfully', async () => {
  FileSaver.saveAs = jest.fn();
  render(<EventInfo event={event} />, { mocks });
  await actWait();

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.buttonAddToCalendar,
    })
  );

  expect(FileSaver.saveAs).toBeCalled();
});

it('should create ics file succesfully when end time is not defined', async () => {
  FileSaver.saveAs = jest.fn();
  render(<EventInfo event={{ ...event, endTime: null }} />, { mocks });
  await actWait();

  // Event info fields
  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.info.buttonAddToCalendar,
    })
  );

  expect(FileSaver.saveAs).toBeCalled();
});
