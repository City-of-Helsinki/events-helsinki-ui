import gql from 'graphql-tag';

export const QUERY_KEYWORD = gql`
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
      ...localizedFields
    }
    heroBackgroundImageColor {
      ...localizedFields
    }
    heroBackgroundImageMobile {
      ...localizedFields
    }
    heroTopLayerImage {
      ...localizedFields
    }
    socialMediaImage {
      ...localizedFields
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
