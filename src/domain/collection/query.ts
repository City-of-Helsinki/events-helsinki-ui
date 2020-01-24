import gql from "graphql-tag";

export const QUERY_COLLECTION_DETAILS = gql`
  query CollectionDetails($id: ID!) {
    collectionDetails(id: $id) {
      id
      eventListQuery
      eventListTitle {
        en
        fi
        sv
      }
    }
  }
`;
