import gql from "graphql-tag";

export const QUERY_EVENT_DETAILS = gql`
  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      id
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
        id
        altLabels
        createdTime
        lastModifiedTime
        nEvents
        dataSource
        name {
          fi
          sv
          en
        }
      }
      location {
        divisions {
          type
          name {
            fi
            sv
            en
          }
        }
        email
        infoUrl {
          fi
          sv
          en
        }
        name {
          fi
          en
          sv
        }
        addressLocality {
          fi
          sv
          en
        }
        streetAddress {
          fi
          sv
          en
        }
        postalCode
        position {
          coordinates
        }
        telephone {
          fi
          sv
          en
        }
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
