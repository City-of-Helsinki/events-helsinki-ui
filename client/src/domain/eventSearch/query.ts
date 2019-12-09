import gql from "graphql-tag";

export const QUERY_EVENT_LIST = gql`
  query EventList {
    eventList {
      meta {
        count
        next
        previous
      }
      data {
        id
      }
    }
  }
`;
