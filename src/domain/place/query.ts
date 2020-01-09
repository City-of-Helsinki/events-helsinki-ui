import gql from "graphql-tag";

export const QUERY_PLACE = gql`
  query PlaceList(
    $dataSource: String
    $divisions: [String]
    $page: Int
    $pageSize: Int
    $showAllPlaces: Boolean
    $sort: String
    $text: String
  ) {
    placeList(
      dataSource: $dataSource
      divisions: $divisions
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
        id
        name {
          fi
          sv
          en
        }
      }
    }
  }
`;
