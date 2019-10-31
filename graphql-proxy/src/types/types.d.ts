export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type LinkedEventAudience = {
   __typename?: 'LinkedEventAudience',
  internalId?: Maybe<Scalars['String']>,
};

export type LinkedEventEventDetails = {
   __typename?: 'LinkedEventEventDetails',
  id: Scalars['ID'],
  location?: Maybe<LinkedEventLocation>,
  keywords: Array<LinkedEventKeyword>,
  super_event?: Maybe<Scalars['ID']>,
  event_status?: Maybe<Scalars['String']>,
  external_links: Array<Scalars['String']>,
  offers: Array<LinkedEventOffer>,
  data_source?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  sub_events: Array<Scalars['ID']>,
  images: Array<LinkedEventImage>,
  in_language: Array<Scalars['String']>,
  audience: Array<LinkedEventAudience>,
  created_time?: Maybe<Scalars['String']>,
  last_modified_time?: Maybe<Scalars['String']>,
  date_published?: Maybe<Scalars['String']>,
  start_time?: Maybe<Scalars['String']>,
  end_time?: Maybe<Scalars['String']>,
  custom_data?: Maybe<Scalars['String']>,
  audience_min_age?: Maybe<Scalars['String']>,
  audience_max_age?: Maybe<Scalars['String']>,
  super_event_type?: Maybe<Scalars['String']>,
  extension_course?: Maybe<LinkedEventExtensionCourse>,
  name?: Maybe<LocalizedObject>,
  location_extra_info?: Maybe<LocalizedObject>,
  short_description?: Maybe<LocalizedObject>,
  provider?: Maybe<Scalars['ID']>,
  info_url?: Maybe<LocalizedObject>,
  provider_contact_info?: Maybe<Scalars['String']>,
  description?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internaleContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedEventExtensionCourse = {
   __typename?: 'LinkedEventExtensionCourse',
  enrolment_start_time?: Maybe<Scalars['String']>,
  enrolment_end_time?: Maybe<Scalars['String']>,
  maximum_attendee_capacity?: Maybe<Scalars['Int']>,
  minimum_attendee_capacity?: Maybe<Scalars['Int']>,
  remaining_attendee_capacity?: Maybe<Scalars['Int']>,
};

export type LinkedEventImage = {
   __typename?: 'LinkedEventImage',
  id: Scalars['ID'],
  license?: Maybe<Scalars['String']>,
  created_time?: Maybe<Scalars['String']>,
  last_modified_time?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  cropping?: Maybe<Scalars['String']>,
  photographer_name?: Maybe<Scalars['String']>,
  data_source?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internaleContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedEventKeyword = {
   __typename?: 'LinkedEventKeyword',
  internalId?: Maybe<Scalars['String']>,
};

export type LinkedEventLocation = {
   __typename?: 'LinkedEventLocation',
  internalId?: Maybe<Scalars['String']>,
};

export type LinkedEventOffer = {
   __typename?: 'LinkedEventOffer',
  is_free?: Maybe<Scalars['Boolean']>,
  description?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['String']>,
  info_url?: Maybe<Scalars['String']>,
};

export type LocalizedObject = {
   __typename?: 'LocalizedObject',
  fi: Scalars['String'],
  sv: Scalars['String'],
  en: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _empty?: Maybe<Scalars['String']>,
};

