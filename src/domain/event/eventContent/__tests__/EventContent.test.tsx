import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent } from '../../../../util/mockDataUtils';
import { actWait, render, screen } from '../../../../util/testUtils';
import EventContent from '../EventContent';

const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';
const description = 'Event description';
const email = 'test@email.com';
const telephone = '0441234567';
const addressLocality = 'Helsinki';
const district = 'Malmi';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const event = fakeEvent({
  startTime,
  endTime,
  description: { fi: description },
  publisher: '',
  location: {
    divisions: [{ name: { fi: district }, type: 'neighborhood' }],
    email,
    telephone: { fi: telephone },
    internalId: 'tprek:8740',
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
  },
}) as EventFieldsFragment;

it('should render event content fields', async () => {
  render(<EventContent event={event} />);
  await actWait();

  // Event info headers
  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelDateAndTime,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelLocation,
    })
  ).toBeInTheDocument();

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

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelDirections,
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: translations.event.info.labelPrice,
    })
  ).toBeInTheDocument();

  // Description
  expect(
    screen.queryByRole('heading', {
      name: translations.event.description.title,
    })
  ).toBeInTheDocument();
  expect(screen.queryByText(description)).toBeInTheDocument();

  // Social media share buttons
  expect(
    screen.queryByRole('heading', {
      name: translations.event.shareLinks.title,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: translations.commons.shareLinks.buttonCopyLink,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: translations.commons.shareLink.shareOnFacebook,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: translations.commons.shareLink.shareOnTwitter,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: translations.commons.shareLink.shareOnLinkedIn,
    })
  ).toBeInTheDocument();

  // Location
  expect(
    screen.queryByRole('heading', {
      name: translations.event.location.title,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: translations.event.location.openMap,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByText([streetAddress, district, addressLocality].join(', '))
  ).toBeInTheDocument();
  expect(
    screen.queryAllByRole('link', {
      name: translations.event.location.directionsGoogle,
    })
  ).toHaveLength(2);
  expect(
    screen.queryAllByRole('link', {
      name: translations.event.location.directionsHSL,
    })
  ).toHaveLength(2);
});
