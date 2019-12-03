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

export const InternalIdObject = gql`
  type InternalIdObject {
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
  }
`;

export const LocalizedObject = gql`
  type LocalizedObject {
    fi: String
    sv: String
    en: String
  }
`;

const global = [
  InternalIdObject,
  LocalizedObject,
  Mutation,
  Query,
  Subscription
];

export default global;
