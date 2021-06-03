import { gql } from '@apollo/client';

export const QUERY_EVENT_DETAILS = gql`
  fragment localizedFields on LocalizedObject {
    en
    fi
    sv
  }

  fragment offerFields on Offer {
    isFree
    price {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    infoUrl {
      ...localizedFields
    }
  }

  fragment generalEventFields on EventDetails {
    audienceMinAge
    audienceMaxAge
    id
    eventStatus
    externalLinks {
      name
      link
    }
    images {
      id
      name
      url
      photographerName
    }
    subEvents {
      internalId
    }
    typeId
    superEvent {
      internalId
    }
    inLanguage {
      name {
        ...localizedFields
      }
    }
    keywords {
      ...keywordFields
    }
    location {
      ...placeFields
    }
    offers {
      ...offerFields
    }
    name {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    shortDescription {
      ...localizedFields
    }
    endTime
    startTime
    publisher
    provider {
      ...localizedFields
    }
    infoUrl {
      ...localizedFields
    }
    audience {
      id
      name {
        ...localizedFields
      }
    }
  }

  fragment courseExtensionFields on EventDetails {
    enrolmentStartTime
    enrolmentEndTime
    maximumAttendeeCapacity
    minimumAttendeeCapacity
    remainingAttendeeCapacity
  }

  fragment courseEventFields on EventDetails {
    ...generalEventFields
    ...courseExtensionFields
  }

  fragment eventFields on EventDetails {
    ...generalEventFields
    ...courseExtensionFields
  }

  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      ...eventFields
    }
  }
`;
