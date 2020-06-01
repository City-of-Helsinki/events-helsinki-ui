import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList(
    $division: [String]
    $end: String
    $inLanguage: String
    $include: [String]
    $isFree: Boolean
    $keyword: [String]
    $keywordAnd: [String]
    $keywordNot: [String]
    $language: String
    $location: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $start: String
    $superEvent: ID
    $superEventType: [String]
    $text: String
    $translation: String
  ) {
    eventList(
      division: $division
      end: $end
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keyword: $keyword
      keywordAnd: $keywordAnd
      keywordNot: $keywordNot
      language: $language
      location: $location
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      start: $start
      superEvent: $superEvent
      superEventType: $superEventType
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
        eventStatus
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
          id
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

  query EventsByIds($ids: [ID!]!, $include: [String]) {
    eventsByIds(ids: $ids, include: $include) {
      id
      eventStatus
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
        id
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
`;
