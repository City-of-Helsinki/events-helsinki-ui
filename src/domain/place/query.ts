import { gql } from '@apollo/client';

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
  query PlaceDetails($id: ID!) {
    placeDetails(id: $id) {
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
