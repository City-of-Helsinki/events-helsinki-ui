import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent, fakeImage } from '../../../../test/mockDataUtils';
import { configure, render, screen } from '../../../../test/testUtils';
import EventContent from '../EventContent';

configure({ defaultHidden: true });

const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';
const description = 'Event description';
const email = 'test@email.com';
const telephone = '0441234567';
const addressLocality = 'Helsinki';
const district = 'Malmi';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const photographerName = 'Kuvaaja Helsinki';
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
  images: [fakeImage({ photographerName })],
}) as EventFieldsFragment;

it('should render event content fields', () => {
  render(<EventContent event={event} />);

  const itemsByRole = [
    { role: 'heading', name: translations.event.info.labelDateAndTime },
    { role: 'heading', name: translations.event.info.labelLocation },
    { role: 'heading', name: translations.event.info.labelLanguages },
    { role: 'heading', name: translations.event.info.labelOtherInfo },
    { role: 'heading', name: translations.event.info.labelDirections },
    { role: 'heading', name: translations.event.info.labelPrice },
    { role: 'heading', name: translations.event.description.title },
    { role: 'heading', name: translations.event.shareLinks.title },
    { role: 'button', name: translations.commons.shareLinks.buttonCopyLink },
    { role: 'button', name: translations.commons.shareLink.shareOnFacebook },
    { role: 'button', name: translations.commons.shareLink.shareOnTwitter },
    { role: 'button', name: translations.commons.shareLink.shareOnLinkedIn },
    { role: 'heading', name: translations.event.location.title },
    {
      role: 'link',
      name: `${translations.event.location.openMap} ${translations.commons.srOnly.opensInANewTab}`,
    },
  ];
  itemsByRole.forEach(({ role, name }) => {
    expect(screen.queryByRole(role, { name })).toBeInTheDocument();
  });

  const itemsByText = [
    description,
    `Kuva: ${photographerName}`,
    [streetAddress, district, addressLocality].join(', '),
  ];

  itemsByText.forEach((item) => {
    expect(screen.queryByText(item)).toBeInTheDocument();
  });

  // Both location and event info have directions links so test that both are available
  const itemsAllByRole = [
    {
      role: 'link',
      name: `${translations.event.location.directionsGoogle} ${translations.commons.srOnly.opensInANewTab}`,
    },
    {
      role: 'link',
      name: `${translations.event.location.directionsHSL} ${translations.commons.srOnly.opensInANewTab}`,
    },
  ];

  itemsAllByRole.forEach(({ role, name }) => {
    expect(screen.queryAllByRole(role, { name })).toHaveLength(2);
  });
});

it('should hide map if internet event', () => {
  render(
    <EventContent
      event={{
        ...event,
        location: { ...event.location, id: 'helsinki:internet' },
      }}
    />
  );
  expect(screen.queryByText(/sijainti/i)).not.toBeInTheDocument();
});
