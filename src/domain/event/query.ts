import gql from "graphql-tag";

export const QUERY_EVENT_DETAILS = gql`
  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
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
          fi
          sv
          en
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
          fi
          sv
          en
        }
        description {
          fi
          sv
          en
        }
        infoUrl {
          fi
          sv
          en
        }
      }
      name {
        fi
        en
        sv
      }
      description {
        fi
        en
        sv
      }
      shortDescription {
        fi
        en
        sv
      }
      endTime
      startTime
      publisher
      provider {
        fi
        sv
        en
      }
      infoUrl {
        fi
        sv
        en
      }
    }
  }

  query OrganizationDetails($id: ID!) {
    organizationDetails(id: $id) {
      id
      name
    }
  }
`;
