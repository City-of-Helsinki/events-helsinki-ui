import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    organizationDetails(id: ID): OrganizationDetails!
  }

  type OrganizationDetails {
    id: ID!
    dataSource: String
    classification: String
    name: String
    foundingDate: String
    dissolutionDate: String
    parentOrganization: String
    subOrganizations: [String]
    affiliatedOrganizations: [String]
    createdTime: String
    lastModifiedTime: String
    isAffiliated: Boolean!
    replacedBy: String
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }
`;

export default typeDefs;
