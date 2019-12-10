import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList {
    eventList {
      meta {
        count
        next
        previous
      }
      data {
        id
        images {
          id
          name
          url
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
        name {
          fi
          en
          sv
        }
        startTime
        endTime
      }
    }
  }
`;
