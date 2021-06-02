import { gql } from '@apollo/client';

export const QUERY_NEIGHBORHOOD = gql`
  query NeighborhoodList {
    neighborhoodList {
      meta {
        count
        next
        previous
      }
      data {
        id
        name {
          fi
          sv
          en
        }
      }
    }
  }
`;
