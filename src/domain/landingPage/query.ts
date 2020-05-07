import gql from "graphql-tag";

export const QUERY_KEYWORD = gql`
  query LandingPage($draft: Boolean, $id: ID!) {
    landingPage(draft: $draft, id: $id) {
      id
      pageTitle {
        fi
        sv
        en
      }
      metaInformation {
        fi
        sv
        en
      }
      title {
        fi
        sv
        en
      }
      description {
        fi
        sv
        en
      }
      buttonText {
        fi
        sv
        en
      }
      buttonUrl {
        fi
        sv
        en
      }
      heroBackgroundImage {
        fi
        sv
        en
      }
      heroTopLayerImage {
        fi
        en
        sv
      }
    }
  }
  query LandingPages($visibleOnFrontpage: Boolean) {
    landingPages(visibleOnFrontpage: $visibleOnFrontpage) {
      data {
        id
        pageTitle {
          fi
          sv
          en
        }
        metaInformation {
          fi
          sv
          en
        }
        title {
          fi
          sv
          en
        }
        description {
          fi
          sv
          en
        }
        buttonText {
          fi
          sv
          en
        }
        buttonUrl {
          fi
          sv
          en
        }
        heroBackgroundImage {
          fi
          sv
          en
        }
        heroTopLayerImage {
          fi
          en
          sv
        }
      }
    }
  }
`;
