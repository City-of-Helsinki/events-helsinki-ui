import gql from "graphql-tag";

export const QUERY_COLLECTION_DETAILS = gql`
  query CollectionDetails($draft: Boolean, $id: ID!) {
    collectionDetails(draft: $draft, id: $id) {
      id
      heroImage
      boxColor
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
      socialMediaDescription {
        en
        fi
        sv
      }
      subtitles {
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
  query CollectionList($visibleOnFrontpage: Boolean) {
    collectionList(visibleOnFrontpage: $visibleOnFrontpage) {
      data {
        id
        heroImage
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
        socialMediaDescription {
          en
          fi
          sv
        }
        subtitles {
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
