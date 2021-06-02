import { gql } from '@apollo/client';

export const QUERY_KEYWORD = gql`
  fragment keywordFields on Keyword {
    id
    internalId
    dataSource
    hasUpcomingEvents
    name {
      fi
      sv
      en
    }
  }
  query KeywordDetails($id: ID!) {
    keywordDetails(id: $id) {
      ...keywordFields
    }
  }
  query KeywordList(
    $dataSource: String
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllKeywords: Boolean
    $sort: String
    $text: String
  ) {
    keywordList(
      dataSource: $dataSource
      hasUpcomingEvents: $hasUpcomingEvents
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
        ...keywordFields
      }
    }
  }
`;
