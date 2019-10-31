import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    linkedEventEventDetails(id: ID): LinkedEventEventDetails!
  }

  type LinkedEventEventDetails {
    id: ID!
    location: LinkedEventLocation
    keywords: [LinkedEventKeyword!]!
    super_event: ID
    event_status: String
    external_links: [String!]!
    offers: [LinkedEventOffer!]!
    data_source: String
    publisher: ID
    sub_events: [ID!]!
    images: [LinkedEventImage!]!
    in_language: [String!]!
    audience: [LinkedEventAudience!]!
    created_time: String
    last_modified_time: String
    date_published: String
    start_time: String
    end_time: String
    custom_data: String
    audience_min_age: String
    audience_max_age: String
    super_event_type: String
    extension_course: LinkedEventExtensionCourse
    name: LocalizedObject
    location_extra_info: LocalizedObject
    short_description: LocalizedObject
    provider: ID
    info_url: LocalizedObject
    provider_contact_info: String
    description: LocalizedObject
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internaleContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type LinkedEventLocation {
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
  }

  type LinkedEventKeyword {
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
  }

  type LinkedEventOffer {
    is_free: Boolean
    description: String
    price: String
    info_url: String
  }

  type LinkedEventImage {
    id: ID!
    license: String
    created_time: String
    last_modified_time: String
    name: String
    url: String
    cropping: String
    photographer_name: String
    data_source: String
    publisher: String
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
    # @context is renamed as internalContext so it's usable on GraphQl
    internaleContext: String
    # @type is renamed as internalType so it's usable on GraphQl
    internalType: String
  }

  type LinkedEventAudience {
    # @id is renamed as internalId so it's usable on GraphQl
    internalId: String
  }

  type LinkedEventExtensionCourse {
    enrolment_start_time: String
    enrolment_end_time: String
    maximum_attendee_capacity: Int
    minimum_attendee_capacity: Int
    remaining_attendee_capacity: Int
  }
`;

export default typeDefs;
