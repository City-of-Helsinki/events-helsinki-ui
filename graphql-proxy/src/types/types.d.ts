export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type InternalIdObject = {
   __typename?: 'InternalIdObject',
  internalId?: Maybe<Scalars['String']>,
};

export type LinkedCoursesEventDetails = {
   __typename?: 'LinkedCoursesEventDetails',
  id: Scalars['ID'],
  location?: Maybe<InternalIdObject>,
  keywords: Array<LinkedCoursesKeyword>,
  superEvent?: Maybe<InternalIdObject>,
  eventStatus?: Maybe<Scalars['String']>,
  externalLinks: Array<LinkedCoursesExternalLink>,
  offers: Array<LinkedCoursesOffer>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  subEvents: Array<InternalIdObject>,
  images: Array<LinkedCoursesImage>,
  inLanguage: Array<InternalIdObject>,
  audience: Array<InternalIdObject>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['String']>,
  startTime?: Maybe<Scalars['String']>,
  endTime?: Maybe<Scalars['String']>,
  customData?: Maybe<Scalars['String']>,
  audienceMinAge?: Maybe<Scalars['String']>,
  audienceMaxAge?: Maybe<Scalars['String']>,
  superEventType?: Maybe<Scalars['String']>,
  extensionCourse?: Maybe<LinkedCoursesExtensionCourse>,
  name?: Maybe<LocalizedObject>,
  locationExtraInfo?: Maybe<LocalizedObject>,
  shortDescription?: Maybe<LocalizedObject>,
  provider?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  providerContactInfo?: Maybe<Scalars['String']>,
  description?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedCoursesExtensionCourse = {
   __typename?: 'LinkedCoursesExtensionCourse',
  enrolmentStartTime?: Maybe<Scalars['String']>,
  enrolmentEndTime?: Maybe<Scalars['String']>,
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>,
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>,
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>,
};

export type LinkedCoursesExternalLink = {
   __typename?: 'LinkedCoursesExternalLink',
  name?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
};

export type LinkedCoursesImage = {
   __typename?: 'LinkedCoursesImage',
  id: Scalars['ID'],
  license?: Maybe<Scalars['String']>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  cropping?: Maybe<Scalars['String']>,
  photographerName?: Maybe<Scalars['String']>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedCoursesKeyword = {
   __typename?: 'LinkedCoursesKeyword',
  id: Scalars['String'],
  altLabels: Array<Scalars['String']>,
  createdTime: Scalars['String'],
  lastModifiedTime: Scalars['String'],
  aggregate?: Maybe<Scalars['Boolean']>,
  deprecated?: Maybe<Scalars['Boolean']>,
  nEvents: Scalars['Int'],
  image?: Maybe<LinkedEventsImage>,
  dataSource: Scalars['String'],
  publisher?: Maybe<Scalars['ID']>,
  name: LocalizedObject,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedCoursesOffer = {
   __typename?: 'LinkedCoursesOffer',
  isFree?: Maybe<Scalars['Boolean']>,
  description?: Maybe<LocalizedObject>,
  price?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
};

export type LinkedEventsEventDetails = {
   __typename?: 'LinkedEventsEventDetails',
  id: Scalars['ID'],
  location?: Maybe<LinkedEventsLocation>,
  keywords: Array<LinkedEventsKeyword>,
  superEvent?: Maybe<InternalIdObject>,
  eventStatus?: Maybe<Scalars['String']>,
  externalLinks: Array<LinkedEventsExternalLink>,
  offers: Array<LinkedEventsOffer>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  subEvents: Array<InternalIdObject>,
  images: Array<LinkedEventsImage>,
  inLanguage: Array<InternalIdObject>,
  audience: Array<InternalIdObject>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['String']>,
  startTime: Scalars['String'],
  endTime: Scalars['String'],
  customData?: Maybe<Scalars['String']>,
  audienceMinAge?: Maybe<Scalars['String']>,
  audienceMaxAge?: Maybe<Scalars['String']>,
  superEventType?: Maybe<Scalars['String']>,
  extensionCourse?: Maybe<LinkedEventsExtensionCourse>,
  name: LocalizedObject,
  locationExtraInfo?: Maybe<LocalizedObject>,
  shortDescription?: Maybe<LocalizedObject>,
  provider?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  providerContactInfo?: Maybe<Scalars['String']>,
  description: LocalizedObject,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedEventsExtensionCourse = {
   __typename?: 'LinkedEventsExtensionCourse',
  enrolmentStartTime?: Maybe<Scalars['String']>,
  enrolmentEndTime?: Maybe<Scalars['String']>,
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>,
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>,
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>,
};

export type LinkedEventsExternalLink = {
   __typename?: 'LinkedEventsExternalLink',
  name?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
};

export type LinkedEventsImage = {
   __typename?: 'LinkedEventsImage',
  id: Scalars['ID'],
  license?: Maybe<Scalars['String']>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  url: Scalars['String'],
  cropping?: Maybe<Scalars['String']>,
  photographerName?: Maybe<Scalars['String']>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedEventsKeyword = {
   __typename?: 'LinkedEventsKeyword',
  id: Scalars['String'],
  altLabels: Array<Scalars['String']>,
  createdTime: Scalars['String'],
  lastModifiedTime: Scalars['String'],
  aggregate?: Maybe<Scalars['Boolean']>,
  deprecated?: Maybe<Scalars['Boolean']>,
  nEvents: Scalars['Int'],
  image?: Maybe<LinkedEventsImage>,
  dataSource: Scalars['String'],
  publisher?: Maybe<Scalars['ID']>,
  name: LocalizedObject,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedEventsLocation = {
   __typename?: 'LinkedEventsLocation',
  id: Scalars['ID'],
  divisions: Array<LinkedEventsLocationDivision>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  customData?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  contactType?: Maybe<Scalars['String']>,
  addressRegion?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  postOfficeBoxNum?: Maybe<Scalars['String']>,
  addressCountry?: Maybe<Scalars['String']>,
  deleted?: Maybe<Scalars['Boolean']>,
  nEvents?: Maybe<Scalars['Int']>,
  image?: Maybe<LinkedEventsImage>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  parent?: Maybe<Scalars['ID']>,
  replacedBy?: Maybe<Scalars['String']>,
  position?: Maybe<LinkedEventsLocationPosition>,
  name?: Maybe<LocalizedObject>,
  description?: Maybe<Scalars['String']>,
  telephone?: Maybe<Scalars['String']>,
  addressLocality?: Maybe<LocalizedObject>,
  streetAddress?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<Scalars['String']>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type LinkedEventsLocationDivision = {
   __typename?: 'LinkedEventsLocationDivision',
  type: Scalars['String'],
  ocdId?: Maybe<Scalars['String']>,
  municipality?: Maybe<Scalars['String']>,
  name?: Maybe<LocalizedObject>,
};

export type LinkedEventsLocationPosition = {
   __typename?: 'LinkedEventsLocationPosition',
  type: Scalars['String'],
  coordinates: Array<Scalars['Float']>,
};

export type LinkedEventsOffer = {
   __typename?: 'LinkedEventsOffer',
  isFree?: Maybe<Scalars['Boolean']>,
  description?: Maybe<LocalizedObject>,
  price?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
};

export type LocalizedObject = {
   __typename?: 'LocalizedObject',
  fi?: Maybe<Scalars['String']>,
  sv?: Maybe<Scalars['String']>,
  en?: Maybe<Scalars['String']>,
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

