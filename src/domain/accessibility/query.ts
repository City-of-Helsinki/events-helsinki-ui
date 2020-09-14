import gql from 'graphql-tag';

export const QUERY_ACCESSIBILITY = gql`
  query AccessibilityPages {
    accessibilityPages {
      data {
        ...staticPageFields
      }
    }
  }
`;
