import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    linkedCoursesEventDetails(id: ID): LinkedCoursesEventDetails!
  }

  type LinkedCoursesEventDetails {
    id: ID!
    location: InternalIdObject
    keywords: [LinkedCoursesKeyword!]!
    superEvent: InternalIdObject
    eventStatus: String
    externalLinks: [LinkedCoursesExternalLink!]!
    offers: [LinkedCoursesOffer!]!
    dataSource: String
    publisher: ID
    subEvents: [InternalIdObject!]!
    images: [LinkedCoursesImage!]!
    inLanguage: [InternalIdObject!]!
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
    extensionCourse: LinkedCoursesExtensionCourse
    name: LocalizedObject
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

  type LinkedCoursesExternalLink {
    name: String
    link: String
    language: String
  }

  type LinkedCoursesKeyword {
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

  type LinkedCoursesOffer {
    isFree: Boolean
    description: LocalizedObject
    price: LocalizedObject
    infoUrl: LocalizedObject
  }

  type LinkedCoursesImage {
    id: ID!
    license: String
    createdTime: String
    lastModifiedTime: String
    name: String
    url: String
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

  type LinkedCoursesExtensionCourse {
    enrolmentStartTime: String
    enrolmentEndTime: String
    maximumAttendeeCapacity: Int
    minimumAttendeeCapacity: Int
    remainingAttendeeCapacity: Int
  }
`;

export default typeDefs;
