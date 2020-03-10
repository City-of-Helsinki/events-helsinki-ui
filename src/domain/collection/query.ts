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
      linkText {
        en
        fi
        sv
      }
      linkUrl {
        en
        fi
        sv
      }
      shortDescription {
        en
        fi
        sv
      }
      similarCollectionsTitle {
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
  query CollectionList {
    collectionList {
      data {
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
        linkText {
          en
          fi
          sv
        }
        linkUrl {
          en
          fi
          sv
        }
        shortDescription {
          en
          fi
          sv
        }
        similarCollectionsTitle {
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
  }
`;
