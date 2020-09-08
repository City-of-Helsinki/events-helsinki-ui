import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
  fragment cmsImageFields on CmsImage {
    photographerCredit
    url
  }

  fragment localizedCmsImageFields on LocalizedCmsImage {
    en {
      ...cmsImageFields
    }
    fi {
      ...cmsImageFields
    }
    sv {
      ...cmsImageFields
    }
  }
  fragment landingPageFields on LandingPage {
    id
    pageTitle {
      ...localizedFields
    }
    metaInformation {
      ...localizedFields
    }
    title {
      ...localizedFields
    }
    titleColor {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    descriptionColor {
      ...localizedFields
    }
    buttonText {
      ...localizedFields
    }
    buttonUrl {
      ...localizedFields
    }
    heroBackgroundImage {
      ...localizedCmsImageFields
    }
    heroBackgroundImageColor {
      ...localizedFields
    }
    heroBackgroundImageMobile {
      ...localizedCmsImageFields
    }
    heroTopLayerImage {
      ...localizedCmsImageFields
    }
    socialMediaImage {
      ...localizedCmsImageFields
    }
  }
  query LandingPage($draft: Boolean, $id: ID!) {
    landingPage(draft: $draft, id: $id) {
      ...landingPageFields
    }
  }
  query LandingPages($visibleOnFrontpage: Boolean) {
    landingPages(visibleOnFrontpage: $visibleOnFrontpage) {
      data {
        ...landingPageFields
      }
    }
  }
`;
