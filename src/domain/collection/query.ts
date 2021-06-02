import { gql } from '@apollo/client';

export const QUERY_COLLECTION_DETAILS = gql`
  fragment collectionFields on CollectionDetails {
    id
    heroImage {
      ...cmsImageFields
    }
    boxColor
    curatedEvents
    curatedEventsTitle {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    expired
    eventListQuery {
      ...localizedFields
    }
    eventListTitle {
      ...localizedFields
    }
    keywords {
      ...localizedCmsKeywords
    }
    linkText {
      ...localizedFields
    }
    linkUrl {
      ...localizedFields
    }
    live
    slug
    socialMediaDescription {
      ...localizedFields
    }
    title {
      ...localizedFields
    }
  }
  query CollectionDetails($draft: Boolean, $slug: ID!) {
    collectionDetails(draft: $draft, slug: $slug) {
      ...collectionFields
    }
  }
  query CollectionList($visibleOnFrontpage: Boolean) {
    collectionList(visibleOnFrontpage: $visibleOnFrontpage) {
      data {
        ...collectionFields
      }
    }
  }
`;
