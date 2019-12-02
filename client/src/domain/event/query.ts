import gql from "graphql-tag";

export const QUERY_FACILITY_PROFILE = gql`
  query EventDetails($id: ID!) {
    linkedEventsEventDetails(id: $id) {
      id
      images {
        id
        name
        url
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
      startTime
    }
  }
`;
