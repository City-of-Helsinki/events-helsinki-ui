import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    eventDetails(id: ID): EventDetails!
    eventList(
      categories: [String]
      endDate: String
      page: Int
      pageSize: Int
      publisher: ID
      startDate: String
    ): EventListResponse!
  }

  type EventListResponse {
    meta: Meta!
    data: [EventDetails!]!
  }

  type EventDetails {
    id: ID!
    location: Location
    keywords: [Keyword!]!
    superEvent: InternalIdObject
    eventStatus: String
    externalLinks: [ExternalLink!]!
    offers: [Offer!]!
    dataSource: String
    publisher: ID
    subEvents: [InternalIdObject!]!
    images: [Image!]!
    inLanguage: [InLanguage!]!
    audience: [InternalIdObject!]!
    createdTime: String
    lastModifiedTime: String
    datePublished: String
    startTime: String
    endTime: String
    customData: String
    audienceMinAge: String
    audienceMaxAge: String
    superEventType: String
    extensionCourse: ExtensionCourse
    name: LocalizedObject!
    locationExtraInfo: LocalizedObject
    shortDescription: LocalizedObject
    provider: LocalizedObject
    infoUrl: LocalizedObject
    providerContactInfo: String
    description: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type ExternalLink {
    name: String
    link: String
    language: String
  }

  type InLanguage {
    id: ID!
    translationAvailable: Boolean
    name: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type Location {
    id: ID!
    divisions: [LocationDivision!]
    createdTime: String
    lastModifiedTime: String
    customData: String
    email: String
    contactType: String
    addressRegion: String
    postalCode: String
    postOfficeBoxNum: String
    addressCountry: String
    deleted: Boolean
    nEvents: Int
    image: Image
    dataSource: String
    publisher: ID
    parent: ID
    replacedBy: String
    position: LocationPosition
    name: LocalizedObject
    description: String
    telephone: LocalizedObject
    addressLocality: LocalizedObject
    streetAddress: LocalizedObject
    infoUrl: LocalizedObject
    internalId: String
    internalContext: String
    internalType: String
  }

  type LocationDivision {
    type: String!
    ocdId: String
    municipality: String
    name: LocalizedObject
  }

  type LocationPosition {
    type: String!
    coordinates: [Float!]!
  }

  type Keyword {
    id: String!
    altLabels: [String!]!
    createdTime: String
    lastModifiedTime: String!
    aggregate: Boolean
    deprecated: Boolean
    nEvents: Int!
    image: Image
    dataSource: String!
    publisher: ID
    name: LocalizedObject!
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type Offer {
    isFree: Boolean
    description: LocalizedObject
    price: LocalizedObject
    infoUrl: LocalizedObject
  }

  type Image {
    id: ID!
    license: String
    createdTime: String
    lastModifiedTime: String
    name: String!
    url: String!
    cropping: String
    photographerName: String
    dataSource: String
    publisher: String
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type ExtensionCourse {
    enrolmentStartTime: String
    enrolmentEndTime: String
    maximumAttendeeCapacity: Int
    minimumAttendeeCapacity: Int
    remainingAttendeeCapacity: Int
  }
`;

export default typeDefs;
