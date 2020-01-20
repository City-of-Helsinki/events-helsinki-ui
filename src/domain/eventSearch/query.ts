import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList(
    $divisions: [String]
    $endDate: String
    $keywords: [String]
    $locations: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $startDate: String
    $text: String
  ) {
    eventList(
      divisions: $divisions
      endDate: $endDate
      keywords: $keywords
      locations: $locations
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      startDate: $startDate
      text: $text
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
