import gql from "graphql-tag";

export const QUERY_KEYWORD = gql`
  query LandingPage {
    landingPage {
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
`;
