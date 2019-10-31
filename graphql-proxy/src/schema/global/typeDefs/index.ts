import { gql } from "apollo-server";

export const Query = gql`
  type Query {
    _empty: String
  }
`;
export const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;
export const Subscription = gql`
  type Subscription {
    _empty: String
  }
`;

export const LocalizedObject = gql`
  type LocalizedObject {
    fi: String!
    sv: String!
    en: String!
  }
`;

const global = [LocalizedObject, Mutation, Query, Subscription];

export default global;
