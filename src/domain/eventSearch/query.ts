import { gql } from '@apollo/client';

export const QUERY_EVENT_LIST = gql`
  query EventList(
    $eventType: [EventTypeId]
    $internetBased: Boolean
    $suitableFor: [Int]
    $allOngoing: Boolean
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
    $keywordOrSet1: [String]
    $keywordOrSet2: [String]
    $keywordOrSet3: [String]
    $keywordNot: [String]
    $language: String
    $localOngoingAnd: [String]
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
    eventList(
      eventType: $eventType
      internetBased: $internetBased
      suitableFor: $suitableFor
      allOngoing: $allOngoing
      allOngoingAnd: $allOngoingAnd
      division: $division
      end: $end
      endsAfter: $endsAfter
      endsBefore: $endsBefore
      include: $include
      inLanguage: $inLanguage
      isFree: $isFree
      keyword: $keyword
      keywordAnd: $keywordAnd
      keywordOrSet1: $keywordOrSet1
      keywordOrSet2: $keywordOrSet2
      keywordOrSet3: $keywordOrSet3
      keywordNot: $keywordNot
      language: $language
      localOngoingAnd: $localOngoingAnd
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
        ...eventFields
      }
    }
  }

  query EventsByIds(
    $ids: [ID!]!
    $eventType: [EventTypeId]
    $include: [String]
    $sort: String
    $pageSize: Int
    $page: Int
    $start: String
    $end: String
  ) {
    eventsByIds(
      ids: $ids
      eventType: $eventType
      include: $include
      sort: $sort
      pageSize: $pageSize
      page: $page
      start: $start
      end: $end
    ) {
      data {
        ...eventFields
      }
      meta {
        count
        next
        previous
      }
    }
  }
`;
