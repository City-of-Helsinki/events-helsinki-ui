import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList($page: Int, $pageSize: Int) {
    eventList(page: $page, pageSize: $pageSize) {
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
