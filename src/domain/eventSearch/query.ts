import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList(
    $divisions: [String]
    $endDate: String
    $include: [String]
    $inLanguage: String
    $keywords: [String]
    $language: String
    $locations: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $startDate: String
    $text: String
    $translation: String
  ) {
    eventList(
      divisions: $divisions
      endDate: $endDate
      include: $include
      inLanguage: $inLanguage
      keywords: $keywords
      language: $language
      locations: $locations
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      startDate: $startDate
      text: $text
      translation: $translation
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
          description {
            fi
            sv
            en
          }
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
