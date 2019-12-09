import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    courseDetails(id: ID): EventDetails!
  }
`;

export default typeDefs;
