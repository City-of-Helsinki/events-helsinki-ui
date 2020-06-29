import gql from "graphql-tag";

export const QUERY_EVENT_DETAILS = gql`
  fragment localizedFields on LocalizedObject {
    en
    fi
    sv
  }

  fragment eventFields on EventDetails {
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
    }
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
  }
  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      ...eventFields
    }
  }

  query OrganizationDetails($id: ID!) {
    organizationDetails(id: $id) {
      id
      name
    }
  }
`;
