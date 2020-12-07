import gql from 'graphql-tag';

export const QUERY_PLACE = gql`
  fragment placeFields on Place {
    id
    divisions {
      type
      name {
        fi
        sv
        en
      }
    }
    hasUpcomingEvents
    internalId
    email
    infoUrl {
      fi
      sv
      en
    }
    name {
      fi
      en
      sv
    }
    addressLocality {
      fi
      sv
      en
    }
    streetAddress {
      fi
      sv
      en
    }
    postalCode
    position {
      coordinates
    }
    telephone {
      fi
      sv
      en
    }
  }
  query PlaceDetails($id: ID!, $source: LinkedEventsSource) {
    placeDetails(id: $id, source: $source) {
      ...placeFields
    }
  }
  query PlaceList(
    $dataSource: String
    $divisions: [String]
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllPlaces: Boolean
    $sort: String
    $text: String
    $source: LinkedEventsSource
  ) {
    placeList(
      dataSource: $dataSource
      divisions: $divisions
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllPlaces: $showAllPlaces
      sort: $sort
      text: $text
      source: $source
    ) {
      meta {
        count
        next
        previous
      }
      data {
        ...placeFields
      }
    }
  }
`;
