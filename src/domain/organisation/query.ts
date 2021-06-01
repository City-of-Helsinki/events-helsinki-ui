import { gql } from '@apollo/client';

export const QUERY_ORGANIZATION_DETAILS = gql`
  fragment organizationFields on OrganizationDetails {
    id
    name
  }
  query OrganizationDetails($id: ID!) {
    organizationDetails(id: $id) {
      ...organizationFields
    }
  }
`;
