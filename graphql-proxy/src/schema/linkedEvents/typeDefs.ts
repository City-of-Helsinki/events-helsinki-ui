import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    linkedEventsEventDetails(id: ID): LinkedEventsEventDetails!
  }

  type LinkedEventsEventDetails {
    id: ID!
    location: LinkedEventsLocation
    keywords: [LinkedEventsKeyword!]!
    superEvent: InternalIdObject
    eventStatus: String
    externalLinks: [LinkedEventsExternalLink!]!
    offers: [LinkedEventsOffer!]!
    dataSource: String
    publisher: ID
    subEvents: [InternalIdObject!]!
    images: [LinkedEventsImage!]!
    inLanguage: [InternalIdObject!]!
    audience: [InternalIdObject!]!
    createdTime: String
    lastModifiedTime: String
    datePublished: String
    startTime: String!
    endTime: String
    customData: String
    audienceMinAge: String
    audienceMaxAge: String
    superEventType: String
    extensionCourse: LinkedEventsExtensionCourse
    name: LocalizedObject!
    locationExtraInfo: LocalizedObject
    shortDescription: LocalizedObject
    provider: LocalizedObject
    infoUrl: LocalizedObject
    providerContactInfo: String
    description: LocalizedObject!
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internalContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type LinkedEventsExternalLink {
    name: String
    link: String
    language: String
  }

  type LinkedEventsLocation {
    id: ID!
    divisions: [LinkedEventsLocationDivision!]!
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
    image: LinkedEventsImage
    dataSource: String
    publisher: ID
    parent: ID
    replacedBy: String
    position: LinkedEventsLocationPosition
    name: LocalizedObject
    description: String
    telephone: String
    addressLocality: LocalizedObject
    streetAddress: LocalizedObject
    infoUrl: String
    internalId: String
    internalContext: String
    internalType: String
  }

  type LinkedEventsLocationDivision {
    type: String!
    ocdId: String
    municipality: String
    name: LocalizedObject
  }

  type LinkedEventsLocationPosition {
    type: String!
    coordinates: [Float!]!
  }

  type LinkedEventsKeyword {
    id: String!
    altLabels: [String!]!
    createdTime: String!
    lastModifiedTime: String!
    aggregate: Boolean
    deprecated: Boolean
    nEvents: Int!
    image: LinkedEventsImage
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

  type LinkedEventsOffer {
    isFree: Boolean
    description: LocalizedObject
    price: LocalizedObject
    infoUrl: LocalizedObject
  }

  type LinkedEventsImage {
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

  type LinkedEventsExtensionCourse {
    enrolmentStartTime: String
    enrolmentEndTime: String
    maximumAttendeeCapacity: Int
    minimumAttendeeCapacity: Int
    remainingAttendeeCapacity: Int
  }
`;

export default typeDefs;
