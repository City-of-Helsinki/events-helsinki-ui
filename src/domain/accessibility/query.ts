import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  fragment staticPageFields on StaticPage {
    id
    expired

    headingSection {
      ...localizedFields
    }
    contentSection {
      ...localizedFields
    }
  }
  query AccessibilityPages {
    accessibilityPages {
      data {
        ...staticPageFields
      }
    }
  }
`;
