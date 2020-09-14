import gql from 'graphql-tag';

export const QUERY_ABOUT = gql`
  fragment staticPageFields on StaticPage {
    id
    expired

    headingSection {
      ...localizedFields
    }
    contentSection {
      ...localizedFields
    }
  }

  query AboutPages {
    aboutPages {
      data {
        ...staticPageFields
      }
    }
  }
`;
