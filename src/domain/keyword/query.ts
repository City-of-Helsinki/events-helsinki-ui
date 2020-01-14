import gql from "graphql-tag";

export const QUERY_KEYWORD = gql`
  query KeywordDetails($id: ID!) {
    keywordDetails(id: $id) {
      id
      name {
        fi
        sv
        en
      }
    }
  }
  query KeywordList(
    $dataSource: String
    $page: Int
    $pageSize: Int
    $showAllKeywords: Boolean
    $sort: String
    $text: String
  ) {
    keywordList(
      dataSource: $dataSource
      page: $page
      pageSize: $pageSize
      showAllKeywords: $showAllKeywords
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
