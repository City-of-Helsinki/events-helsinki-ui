import gql from "graphql-tag";

export const QUERY_COLLECTION_DETAILS = gql`
  query CollectionDetails($id: ID!) {
    collectionDetails(id: $id) {
      id
      curatedEvents
      curatedEventsTitle {
        en
        fi
        sv
      }
      description {
        en
        fi
        sv
      }
      eventListQuery
      eventListTitle {
        en
        fi
        sv
      }
      link {
        text {
          en
          fi
          sv
        }
        url {
          en
          fi
          sv
        }
      }
      shortDescription {
        en
        fi
        sv
      }
      title {
        en
        fi
        sv
      }
    }
  }
`;
