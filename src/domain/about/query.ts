import gql from 'graphql-tag';

export const QUERY_ABOUT = gql`
  fragment localizedCmsKeywords on LocalizedCmsKeywords {
    en
    fi
    sv
  }

  fragment staticPageFields on StaticPage {
    id
    expired
    headingSection {
      ...localizedFields
    }
    contentSection {
      ...localizedFields
    }
    keywords {
      ...localizedCmsKeywords
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
