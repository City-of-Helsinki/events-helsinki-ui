import { addDays } from 'date-fns';
import { range } from 'lodash';

import {
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

export const organizationId = '1';
export const organizationName = 'Organization name';
export const organization = fakeOrganization({
  id: organizationId,
  name: organizationName,
});
export const organizationResponse = {
  data: { organizationDetails: organization },
};

export const superEventId = 'hel:123';
export const superEventInternalId = `https://api.hel.fi/linkedevents/v1/event/${superEventId}`;
export const startTime = '2020-06-22T07:00:00.000000Z';
export const endTime = '2020-06-22T10:00:00.000000Z';
export const email = 'test@email.com';
export const telephone = '0441234567';
export const addressLocality = 'Helsinki';
export const district = 'Malmi';
export const locationName = 'Location name';
export const streetAddress = 'Test address 1';
export const price = '12 €';
export const targetGroups = ['lapset', 'aikuiset'];
export const maximumAttendeeCapacity = 20;
export const minimumAttendeeCapacity = 10;
export const remainingAttendeeCapacity = 5;
export const audienceMinAge = '5';
export const audienceMaxAge = '15';
export const organizerName = 'provider organisation';
export const event = fakeEvent({
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

export const meta: Meta = {
  count: 20,
  next:
    // eslint-disable-next-line max-len
    'https://api.hel.fi/linkedevents/v1/event/?include=keyword,location&page=2&sort=start_time&start=2020-08-11T03&super_event=hel:123',
  previous: null,
  __typename: 'Meta',
};

export const subEventsResponse = {
  ...fakeEvents(
    10,
    range(1, 11).map((i) => ({
      endTime: addDays(new Date(endTime), i).toISOString(),
      startTime: addDays(new Date(startTime), i).toISOString(),
      typeId: EventTypeId.General,
      superEvent: { internalId: superEventInternalId },
    }))
  ),
  meta,
};

export const subEventsLoadMoreResponse = {
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

export const getSubEventsMocks = ({
  response,
  variables,
}: {
  response: EventListResponse;
  variables?: EventListQueryVariables;
}) =>
  createOtherEventTimesRequestAndResultMocks({
    superEventId: event.id,
    response,
    variables,
  });

export const firstSubEventsLoadMock = getSubEventsMocks({
  response: subEventsResponse,
});

export const secondSubEventsLoadMock = getSubEventsMocks({
  variables: { page: 2 },
  response: subEventsLoadMoreResponse,
});

export const mocks = [
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

export const mocksWithSubEvents = [
  ...mocks,
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: organizationId,
      },
    },
    result: organizationResponse,
  },
  firstSubEventsLoadMock,
  secondSubEventsLoadMock,
];
