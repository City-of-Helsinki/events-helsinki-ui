import gql from 'graphql-tag';

export const QUERY_EVENT_LIST = gql`
  query CourseList(
    $allOngoingAnd: [String]
    $division: [String]
    $end: String
    $endsAfter: String
    $endsBefore: String
    $inLanguage: String
    $include: [String]
    $isFree: Boolean
    $keyword: [String]
    $keywordAnd: [String]
    $keywordNot: [String]
    $language: String
    $location: [String]
    $page: Int
    $pageSize: Int
    $publisher: ID
    $sort: String
    $start: String
    $startsAfter: String
    $startsBefore: String
    $superEvent: ID
    $superEventType: [String]
    $text: String
    $translation: String
  ) {
    courseList(
      combinedText: $allOngoingAnd
      division: $division
      end: $end
      endsAfter: $endsAfter
      endsBefore: $endsBefore
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keyword: $keyword
      keywordAnd: $keywordAnd
      keywordNot: $keywordNot
      language: $language
      location: $location
      page: $page
      pageSize: $pageSize
      publisher: $publisher
      sort: $sort
      start: $start
      startsAfter: $startsAfter
      startsBefore: $startsBefore
      superEvent: $superEvent
      superEventType: $superEventType
      text: $text
      translation: $translation
    ) {
      meta {
        count
        next
        previous
      }
      data {
        ...courseFields
      }
    }
  }

  query CoursesByIds($ids: [ID!]!, $include: [String]) {
    coursesByIds(ids: $ids, include: $include) {
      ...courseFields
    }
  }
`;
