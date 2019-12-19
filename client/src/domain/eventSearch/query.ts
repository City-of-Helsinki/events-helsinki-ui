import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList(
    $endDate: String
    $page: Int
    $pageSize: Int
    $publisher: ID
    $startDate: String
  ) {
    eventList(
      endDate: $endDate
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      startDate: $startDate
    ) {
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
        keywords {
          id
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
              en
              sv
            }
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
        }
        name {
          fi
          en
          sv
        }
        offers {
          isFree
          price {
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
        startTime
        endTime
      }
    }
  }
`;
