import gql from "graphql-tag";

export const QUERY_FACILITY_PROFILE = gql`
  query EventDetails($id: ID!) {
    linkedEventsEventDetails(id: $id) {
      id
    }
  }
`;
