import gql from "graphql-tag";

export const QUERY_KEYWORD = gql`
  query LandingPage($visibleOnFrontpage: Boolean) {
    landingPage(visibleOnFrontpage: $visibleOnFrontpage) {
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
      }
    }
  }
`;
