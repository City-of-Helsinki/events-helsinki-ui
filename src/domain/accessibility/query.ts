import { gql } from '@apollo/client';

export const QUERY_ACCESSIBILITY = gql`
  query AccessibilityPages {
    accessibilityPages {
      data {
        ...staticPageFields
      }
    }
  }
`;
