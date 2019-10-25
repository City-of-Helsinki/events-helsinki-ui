import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    items: [Item!]!
  }
  type Item {
    id: ID!
  }
`;

export default typeDefs;
