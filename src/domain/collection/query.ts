import gql from 'graphql-tag';

export const QUERY_COLLECTION_DETAILS = gql`
  fragment collectionFields on CollectionDetails {
    id
    heroImage
    boxColor
    curatedEvents
    curatedEventsTitle {
      ...localizedFields
    }
    description {
      ...localizedFields
    }
    eventListQuery {
      ...localizedFields
    }
    eventListTitle {
      ...localizedFields
    }
    linkText {
      ...localizedFields
    }
    linkUrl {
      ...localizedFields
    }
    socialMediaDescription {
      ...localizedFields
    }
    title {
      ...localizedFields
    }
  }
  query CollectionDetails($draft: Boolean, $id: ID!) {
    collectionDetails(draft: $draft, id: $id) {
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
