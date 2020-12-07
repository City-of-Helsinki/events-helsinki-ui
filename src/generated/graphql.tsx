import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AboutPagesResponse = {
   __typename?: 'AboutPagesResponse',
  data: Array<StaticPage>,
};

export type AccessibilityPagesResponse = {
   __typename?: 'AccessibilityPagesResponse',
  data: Array<StaticPage>,
};

export type CmsImage = {
   __typename?: 'CmsImage',
  photographerCredit?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
};

export type CollectionDetails = {
   __typename?: 'CollectionDetails',
  id: Scalars['ID'],
  boxColor?: Maybe<Scalars['String']>,
  contentType?: Maybe<Scalars['Int']>,
  curatedEvents: Array<Scalars['String']>,
  curatedEventsTitle?: Maybe<LocalizedObject>,
  depth?: Maybe<Scalars['Int']>,
  description?: Maybe<LocalizedObject>,
  draftTitle?: Maybe<Scalars['String']>,
  eventListQuery?: Maybe<LocalizedObject>,
  eventListTitle?: Maybe<LocalizedObject>,
  expireAt?: Maybe<Scalars['String']>,
  expired?: Maybe<Scalars['Boolean']>,
  firstPublishedAt?: Maybe<Scalars['String']>,
  goLiveAt?: Maybe<Scalars['String']>,
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>,
  heroImage?: Maybe<CmsImage>,
  keywords?: Maybe<LocalizedCmsKeywords>,
  lastPublishedAt?: Maybe<Scalars['String']>,
  latestRevisionCreatedAt?: Maybe<Scalars['String']>,
  linkText?: Maybe<LocalizedObject>,
  linkUrl?: Maybe<LocalizedObject>,
  live?: Maybe<Scalars['Boolean']>,
  liveRevision?: Maybe<Scalars['Int']>,
  locked?: Maybe<Scalars['Boolean']>,
  lockedAt?: Maybe<Scalars['String']>,
  lockedBy?: Maybe<Scalars['Int']>,
  numchild?: Maybe<Scalars['Int']>,
  owner?: Maybe<Scalars['Int']>,
  path?: Maybe<Scalars['String']>,
  searchDescription?: Maybe<Scalars['String']>,
  seoTitle?: Maybe<Scalars['String']>,
  showInMenus?: Maybe<Scalars['Boolean']>,
  slug: Scalars['ID'],
  socialMediaDescription?: Maybe<LocalizedObject>,
  title: LocalizedObject,
  urlPath?: Maybe<Scalars['String']>,
};

export type CollectionListResponse = {
   __typename?: 'CollectionListResponse',
  data: Array<CollectionDetails>,
};

export type Division = {
   __typename?: 'Division',
  type: Scalars['String'],
  ocdId?: Maybe<Scalars['String']>,
  municipality?: Maybe<Scalars['String']>,
  name?: Maybe<LocalizedObject>,
};

export type EventDetails = {
   __typename?: 'EventDetails',
  id: Scalars['ID'],
  location?: Maybe<Place>,
  keywords: Array<Keyword>,
  superEvent?: Maybe<InternalIdObject>,
  eventStatus?: Maybe<Scalars['String']>,
  externalLinks: Array<ExternalLink>,
  offers: Array<Offer>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  subEvents: Array<InternalIdObject>,
  images: Array<Image>,
  inLanguage: Array<InLanguage>,
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
  name: LocalizedObject,
  locationExtraInfo?: Maybe<LocalizedObject>,
  shortDescription?: Maybe<LocalizedObject>,
  provider?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  providerContactInfo?: Maybe<Scalars['String']>,
  description?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
  extensionCourse?: Maybe<ExtensionCourse>,
};

export type EventListResponse = {
   __typename?: 'EventListResponse',
  meta: Meta,
  data: Array<EventDetails>,
};

export type ExtensionCourse = {
   __typename?: 'ExtensionCourse',
  enrolmentStartTime?: Maybe<Scalars['String']>,
  enrolmentEndTime?: Maybe<Scalars['String']>,
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>,
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>,
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>,
};

export type ExternalLink = {
   __typename?: 'ExternalLink',
  name?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
};

export type Image = {
   __typename?: 'Image',
  id?: Maybe<Scalars['ID']>,
  license?: Maybe<Scalars['String']>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  url: Scalars['String'],
  cropping?: Maybe<Scalars['String']>,
  photographerName?: Maybe<Scalars['String']>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['String']>,
  internalId: Scalars['String'],
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type InLanguage = {
   __typename?: 'InLanguage',
  id?: Maybe<Scalars['ID']>,
  translationAvailable?: Maybe<Scalars['Boolean']>,
  name?: Maybe<LocalizedObject>,
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type InternalIdObject = {
   __typename?: 'InternalIdObject',
  internalId?: Maybe<Scalars['String']>,
};

export type Keyword = {
   __typename?: 'Keyword',
  id?: Maybe<Scalars['ID']>,
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdTime?: Maybe<Scalars['String']>,
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  aggregate?: Maybe<Scalars['Boolean']>,
  deprecated?: Maybe<Scalars['Boolean']>,
  nEvents?: Maybe<Scalars['Int']>,
  image?: Maybe<Image>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  name?: Maybe<LocalizedObject>,
  internalId: Scalars['String'],
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type KeywordListResponse = {
   __typename?: 'KeywordListResponse',
  meta: Meta,
  data: Array<Keyword>,
};

export type LandingPage = {
   __typename?: 'LandingPage',
  id: Scalars['ID'],
  path?: Maybe<Scalars['String']>,
  depth?: Maybe<Scalars['Int']>,
  numchild?: Maybe<Scalars['Int']>,
  draftTitle?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  live?: Maybe<Scalars['Boolean']>,
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>,
  urlPath?: Maybe<Scalars['String']>,
  seoTitle?: Maybe<Scalars['String']>,
  showInMenus?: Maybe<Scalars['Boolean']>,
  searchDescription?: Maybe<Scalars['String']>,
  goLiveAt?: Maybe<Scalars['String']>,
  expireAt?: Maybe<Scalars['String']>,
  expired?: Maybe<Scalars['Boolean']>,
  locked?: Maybe<Scalars['Boolean']>,
  lockedAt?: Maybe<Scalars['String']>,
  firstPublishedAt?: Maybe<Scalars['String']>,
  lastPublishedAt?: Maybe<Scalars['String']>,
  latestRevisionCreatedAt?: Maybe<Scalars['String']>,
  title?: Maybe<LocalizedObject>,
  description?: Maybe<LocalizedObject>,
  keywords?: Maybe<LocalizedCmsKeywords>,
  titleAndDescriptionColor?: Maybe<LocalizedObject>,
  buttonText?: Maybe<LocalizedObject>,
  buttonUrl?: Maybe<LocalizedObject>,
  heroBackgroundImage?: Maybe<LocalizedCmsImage>,
  heroBackgroundImageMobile?: Maybe<LocalizedCmsImage>,
  heroBackgroundImageColor?: Maybe<LocalizedObject>,
  heroTopLayerImage?: Maybe<LocalizedCmsImage>,
  socialMediaImage?: Maybe<LocalizedCmsImage>,
  metaInformation?: Maybe<LocalizedObject>,
  pageTitle?: Maybe<LocalizedObject>,
  contentType?: Maybe<Scalars['Int']>,
  owner?: Maybe<Scalars['Int']>,
  lockedBy?: Maybe<Scalars['Int']>,
  liveRevision?: Maybe<Scalars['Int']>,
};

export type LandingPagesResponse = {
   __typename?: 'LandingPagesResponse',
  data: Array<LandingPage>,
};

export enum LinkedEventsSource {
  Linkedevents = 'LINKEDEVENTS',
  Linkedcourses = 'LINKEDCOURSES'
}

export type LocalizedCmsImage = {
   __typename?: 'LocalizedCmsImage',
  en?: Maybe<CmsImage>,
  fi?: Maybe<CmsImage>,
  sv?: Maybe<CmsImage>,
};

export type LocalizedCmsKeywords = {
   __typename?: 'LocalizedCmsKeywords',
  en?: Maybe<Array<Maybe<Scalars['String']>>>,
  fi?: Maybe<Array<Maybe<Scalars['String']>>>,
  sv?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type LocalizedObject = {
   __typename?: 'LocalizedObject',
  fi?: Maybe<Scalars['String']>,
  sv?: Maybe<Scalars['String']>,
  en?: Maybe<Scalars['String']>,
};

export type Meta = {
   __typename?: 'Meta',
  count: Scalars['Int'],
  next?: Maybe<Scalars['String']>,
  previous?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
};

export type Neighborhood = {
   __typename?: 'Neighborhood',
  id: Scalars['ID'],
  name: LocalizedObject,
};

export type NeighborhoodListResponse = {
   __typename?: 'NeighborhoodListResponse',
  meta: Meta,
  data: Array<Neighborhood>,
};

export type Offer = {
   __typename?: 'Offer',
  isFree?: Maybe<Scalars['Boolean']>,
  description?: Maybe<LocalizedObject>,
  price?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
};

export type OrganizationDetails = {
   __typename?: 'OrganizationDetails',
  id?: Maybe<Scalars['ID']>,
  dataSource?: Maybe<Scalars['String']>,
  classification?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  foundingDate?: Maybe<Scalars['String']>,
  dissolutionDate?: Maybe<Scalars['String']>,
  parentOrganization?: Maybe<Scalars['String']>,
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>,
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdTime?: Maybe<Scalars['String']>,
  lastModifiedTime?: Maybe<Scalars['String']>,
  isAffiliated: Scalars['Boolean'],
  replacedBy?: Maybe<Scalars['String']>,
  internalId: Scalars['String'],
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type Place = {
   __typename?: 'Place',
  id?: Maybe<Scalars['ID']>,
  divisions?: Maybe<Array<Division>>,
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>,
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
  image?: Maybe<Image>,
  dataSource?: Maybe<Scalars['String']>,
  publisher?: Maybe<Scalars['ID']>,
  parent?: Maybe<Scalars['ID']>,
  replacedBy?: Maybe<Scalars['String']>,
  position?: Maybe<PlacePosition>,
  name?: Maybe<LocalizedObject>,
  description?: Maybe<Scalars['String']>,
  telephone?: Maybe<LocalizedObject>,
  addressLocality?: Maybe<LocalizedObject>,
  streetAddress?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
  internalId: Scalars['String'],
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type PlaceListResponse = {
   __typename?: 'PlaceListResponse',
  meta: Meta,
  data: Array<Place>,
};

export type PlacePosition = {
   __typename?: 'PlacePosition',
  type: Scalars['String'],
  coordinates: Array<Scalars['Float']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  aboutPages: AboutPagesResponse,
  accessibilityPages: AccessibilityPagesResponse,
  collectionDetails: CollectionDetails,
  collectionList: CollectionListResponse,
  eventDetails: EventDetails,
  eventList: EventListResponse,
  eventsByIds: Array<EventDetails>,
  courseDetails: EventDetails,
  courseList: EventListResponse,
  coursesByIds: Array<EventDetails>,
  keywordDetails: Keyword,
  keywordList: KeywordListResponse,
  landingPage: LandingPage,
  landingPages: LandingPagesResponse,
  neighborhoodList: NeighborhoodListResponse,
  organizationDetails: OrganizationDetails,
  placeDetails: Place,
  placeList: PlaceListResponse,
};


export type QueryCollectionDetailsArgs = {
  slug?: Maybe<Scalars['ID']>,
  draft?: Maybe<Scalars['Boolean']>
};


export type QueryCollectionListArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>
};


export type QueryEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type QueryEventListArgs = {
  combinedText?: Maybe<Array<Maybe<Scalars['String']>>>,
  division?: Maybe<Array<Maybe<Scalars['String']>>>,
  end?: Maybe<Scalars['String']>,
  endsAfter?: Maybe<Scalars['String']>,
  endsBefore?: Maybe<Scalars['String']>,
  inLanguage?: Maybe<Scalars['String']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>,
  isFree?: Maybe<Scalars['Boolean']>,
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>,
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>,
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>,
  language?: Maybe<Scalars['String']>,
  location?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  publisher?: Maybe<Scalars['ID']>,
  sort?: Maybe<Scalars['String']>,
  start?: Maybe<Scalars['String']>,
  startsAfter?: Maybe<Scalars['String']>,
  startsBefore?: Maybe<Scalars['String']>,
  superEvent?: Maybe<Scalars['ID']>,
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>,
  text?: Maybe<Scalars['String']>,
  translation?: Maybe<Scalars['String']>,
  audienceMinAgeLt?: Maybe<Scalars['String']>,
  audienceMinAgeGt?: Maybe<Scalars['String']>,
  audienceMaxAgeLt?: Maybe<Scalars['String']>,
  audienceMaxAgeGt?: Maybe<Scalars['String']>
};


export type QueryEventsByIdsArgs = {
  ids: Array<Scalars['ID']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type QueryCourseDetailsArgs = {
  id?: Maybe<Scalars['ID']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type QueryCourseListArgs = {
  combinedText?: Maybe<Array<Maybe<Scalars['String']>>>,
  division?: Maybe<Array<Maybe<Scalars['String']>>>,
  end?: Maybe<Scalars['String']>,
  endsAfter?: Maybe<Scalars['String']>,
  endsBefore?: Maybe<Scalars['String']>,
  inLanguage?: Maybe<Scalars['String']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>,
  isFree?: Maybe<Scalars['Boolean']>,
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>,
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>,
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>,
  language?: Maybe<Scalars['String']>,
  location?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  publisher?: Maybe<Scalars['ID']>,
  sort?: Maybe<Scalars['String']>,
  start?: Maybe<Scalars['String']>,
  startsAfter?: Maybe<Scalars['String']>,
  startsBefore?: Maybe<Scalars['String']>,
  superEvent?: Maybe<Scalars['ID']>,
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>,
  text?: Maybe<Scalars['String']>,
  translation?: Maybe<Scalars['String']>,
  audienceMinAgeLt?: Maybe<Scalars['String']>,
  audienceMinAgeGt?: Maybe<Scalars['String']>,
  audienceMaxAgeLt?: Maybe<Scalars['String']>,
  audienceMaxAgeGt?: Maybe<Scalars['String']>
};


export type QueryCoursesByIdsArgs = {
  ids: Array<Scalars['ID']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type QueryKeywordDetailsArgs = {
  id: Scalars['ID'],
  source?: Maybe<LinkedEventsSource>
};


export type QueryKeywordListArgs = {
  dataSource?: Maybe<Scalars['String']>,
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllKeywords?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  source?: Maybe<LinkedEventsSource>
};


export type QueryLandingPageArgs = {
  draft?: Maybe<Scalars['Boolean']>,
  id: Scalars['ID']
};


export type QueryLandingPagesArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>
};


export type QueryOrganizationDetailsArgs = {
  id: Scalars['ID'],
  source?: Maybe<LinkedEventsSource>
};


export type QueryPlaceDetailsArgs = {
  id: Scalars['ID'],
  source?: Maybe<LinkedEventsSource>
};


export type QueryPlaceListArgs = {
  dataSource?: Maybe<Scalars['String']>,
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>,
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllPlaces?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  source?: Maybe<LinkedEventsSource>
};

export type StaticPage = {
   __typename?: 'StaticPage',
  id: Scalars['ID'],
  path?: Maybe<Scalars['String']>,
  depth?: Maybe<Scalars['Int']>,
  numchild?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  draftTitle?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  live?: Maybe<Scalars['Boolean']>,
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>,
  urlPath?: Maybe<Scalars['String']>,
  seoTitle?: Maybe<Scalars['String']>,
  showInMenus?: Maybe<Scalars['Boolean']>,
  searchDescription?: Maybe<Scalars['String']>,
  goLiveAt?: Maybe<Scalars['String']>,
  expireAt?: Maybe<Scalars['String']>,
  expired?: Maybe<Scalars['Boolean']>,
  locked?: Maybe<Scalars['Boolean']>,
  lockedAt?: Maybe<Scalars['String']>,
  firstPublishedAt?: Maybe<Scalars['String']>,
  keywords?: Maybe<LocalizedCmsKeywords>,
  lastPublishedAt?: Maybe<Scalars['String']>,
  latestRevisionCreatedAt?: Maybe<Scalars['String']>,
  headingSection?: Maybe<LocalizedObject>,
  contentSection?: Maybe<LocalizedObject>,
  contentYype?: Maybe<Scalars['Int']>,
  owner?: Maybe<Scalars['Int']>,
  lockedBy?: Maybe<Scalars['String']>,
  liveRevision?: Maybe<Scalars['Int']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _empty?: Maybe<Scalars['String']>,
};

export type LocalizedCmsKeywordsFragment = (
  { __typename?: 'LocalizedCmsKeywords' }
  & Pick<LocalizedCmsKeywords, 'en' | 'fi' | 'sv'>
);

export type StaticPageFieldsFragment = (
  { __typename?: 'StaticPage' }
  & Pick<StaticPage, 'id' | 'expired'>
  & { headingSection: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, contentSection: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, keywords: Maybe<(
    { __typename?: 'LocalizedCmsKeywords' }
    & LocalizedCmsKeywordsFragment
  )> }
);

export type AboutPagesQueryVariables = {};


export type AboutPagesQuery = (
  { __typename?: 'Query' }
  & { aboutPages: (
    { __typename?: 'AboutPagesResponse' }
    & { data: Array<(
      { __typename?: 'StaticPage' }
      & StaticPageFieldsFragment
    )> }
  ) }
);

export type AccessibilityPagesQueryVariables = {};


export type AccessibilityPagesQuery = (
  { __typename?: 'Query' }
  & { accessibilityPages: (
    { __typename?: 'AccessibilityPagesResponse' }
    & { data: Array<(
      { __typename?: 'StaticPage' }
      & StaticPageFieldsFragment
    )> }
  ) }
);

export type CollectionFieldsFragment = (
  { __typename?: 'CollectionDetails' }
  & Pick<CollectionDetails, 'id' | 'boxColor' | 'curatedEvents' | 'expired' | 'slug'>
  & { heroImage: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )>, curatedEventsTitle: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, description: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, eventListQuery: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, eventListTitle: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, keywords: Maybe<(
    { __typename?: 'LocalizedCmsKeywords' }
    & LocalizedCmsKeywordsFragment
  )>, linkText: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, linkUrl: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, socialMediaDescription: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, title: (
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  ) }
);

export type CollectionDetailsQueryVariables = {
  draft?: Maybe<Scalars['Boolean']>,
  slug: Scalars['ID']
};


export type CollectionDetailsQuery = (
  { __typename?: 'Query' }
  & { collectionDetails: (
    { __typename?: 'CollectionDetails' }
    & CollectionFieldsFragment
  ) }
);

export type CollectionListQueryVariables = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>
};


export type CollectionListQuery = (
  { __typename?: 'Query' }
  & { collectionList: (
    { __typename?: 'CollectionListResponse' }
    & { data: Array<(
      { __typename?: 'CollectionDetails' }
      & CollectionFieldsFragment
    )> }
  ) }
);

export type CourseFieldsFragment = (
  { __typename?: 'EventDetails' }
  & { extensionCourse: Maybe<(
    { __typename?: 'ExtensionCourse' }
    & Pick<ExtensionCourse, 'enrolmentStartTime' | 'enrolmentEndTime' | 'maximumAttendeeCapacity' | 'minimumAttendeeCapacity' | 'remainingAttendeeCapacity'>
  )> }
  & EventFieldsFragment
);

export type CourseDetailsQueryVariables = {
  id: Scalars['ID'],
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type CourseDetailsQuery = (
  { __typename?: 'Query' }
  & { courseDetails: (
    { __typename?: 'EventDetails' }
    & CourseFieldsFragment
  ) }
);

export type CourseListQueryVariables = {
  combinedText?: Maybe<Array<Maybe<Scalars['String']>>>,
  division?: Maybe<Array<Maybe<Scalars['String']>>>,
  end?: Maybe<Scalars['String']>,
  endsAfter?: Maybe<Scalars['String']>,
  endsBefore?: Maybe<Scalars['String']>,
  inLanguage?: Maybe<Scalars['String']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>,
  isFree?: Maybe<Scalars['Boolean']>,
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>,
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>,
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>,
  language?: Maybe<Scalars['String']>,
  location?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  publisher?: Maybe<Scalars['ID']>,
  sort?: Maybe<Scalars['String']>,
  start?: Maybe<Scalars['String']>,
  startsAfter?: Maybe<Scalars['String']>,
  startsBefore?: Maybe<Scalars['String']>,
  superEvent?: Maybe<Scalars['ID']>,
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>,
  text?: Maybe<Scalars['String']>,
  translation?: Maybe<Scalars['String']>
};


export type CourseListQuery = (
  { __typename?: 'Query' }
  & { courseList: (
    { __typename?: 'EventListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'EventDetails' }
      & CourseFieldsFragment
    )> }
  ) }
);

export type CoursesByIdsQueryVariables = {
  ids: Array<Scalars['ID']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type CoursesByIdsQuery = (
  { __typename?: 'Query' }
  & { coursesByIds: Array<(
    { __typename?: 'EventDetails' }
    & CourseFieldsFragment
  )> }
);

export type LocalizedFieldsFragment = (
  { __typename?: 'LocalizedObject' }
  & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
);

export type OfferFieldsFragment = (
  { __typename?: 'Offer' }
  & Pick<Offer, 'isFree'>
  & { price: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, description: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, infoUrl: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )> }
);

export type EventFieldsFragment = (
  { __typename?: 'EventDetails' }
  & Pick<EventDetails, 'id' | 'eventStatus' | 'endTime' | 'startTime' | 'publisher'>
  & { externalLinks: Array<(
    { __typename?: 'ExternalLink' }
    & Pick<ExternalLink, 'name' | 'link'>
  )>, images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'name' | 'url'>
  )>, superEvent: Maybe<(
    { __typename?: 'InternalIdObject' }
    & Pick<InternalIdObject, 'internalId'>
  )>, inLanguage: Array<(
    { __typename?: 'InLanguage' }
    & { name: Maybe<(
      { __typename?: 'LocalizedObject' }
      & LocalizedFieldsFragment
    )> }
  )>, keywords: Array<(
    { __typename?: 'Keyword' }
    & KeywordFieldsFragment
  )>, location: Maybe<(
    { __typename?: 'Place' }
    & PlaceFieldsFragment
  )>, offers: Array<(
    { __typename?: 'Offer' }
    & OfferFieldsFragment
  )>, name: (
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  ), description: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, shortDescription: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, provider: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, infoUrl: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )> }
);

export type EventDetailsQueryVariables = {
  id: Scalars['ID'],
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type EventDetailsQuery = (
  { __typename?: 'Query' }
  & { eventDetails: (
    { __typename?: 'EventDetails' }
    & EventFieldsFragment
  ) }
);

export type EventListQueryVariables = {
  combinedText?: Maybe<Array<Maybe<Scalars['String']>>>,
  division?: Maybe<Array<Maybe<Scalars['String']>>>,
  end?: Maybe<Scalars['String']>,
  endsAfter?: Maybe<Scalars['String']>,
  endsBefore?: Maybe<Scalars['String']>,
  inLanguage?: Maybe<Scalars['String']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>,
  isFree?: Maybe<Scalars['Boolean']>,
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>,
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>,
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>,
  language?: Maybe<Scalars['String']>,
  location?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  publisher?: Maybe<Scalars['ID']>,
  sort?: Maybe<Scalars['String']>,
  start?: Maybe<Scalars['String']>,
  startsAfter?: Maybe<Scalars['String']>,
  startsBefore?: Maybe<Scalars['String']>,
  superEvent?: Maybe<Scalars['ID']>,
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>,
  text?: Maybe<Scalars['String']>,
  translation?: Maybe<Scalars['String']>
};


export type EventListQuery = (
  { __typename?: 'Query' }
  & { eventList: (
    { __typename?: 'EventListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'EventDetails' }
      & EventFieldsFragment
    )> }
  ) }
);

export type EventsByIdsQueryVariables = {
  ids: Array<Scalars['ID']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type EventsByIdsQuery = (
  { __typename?: 'Query' }
  & { eventsByIds: Array<(
    { __typename?: 'EventDetails' }
    & EventFieldsFragment
  )> }
);

export type KeywordFieldsFragment = (
  { __typename?: 'Keyword' }
  & Pick<Keyword, 'id' | 'internalId' | 'dataSource' | 'hasUpcomingEvents'>
  & { name: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )> }
);

export type KeywordDetailsQueryVariables = {
  id: Scalars['ID']
};


export type KeywordDetailsQuery = (
  { __typename?: 'Query' }
  & { keywordDetails: (
    { __typename?: 'Keyword' }
    & KeywordFieldsFragment
  ) }
);

export type KeywordListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>,
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllKeywords?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  source?: Maybe<LinkedEventsSource>
};


export type KeywordListQuery = (
  { __typename?: 'Query' }
  & { keywordList: (
    { __typename?: 'KeywordListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Keyword' }
      & KeywordFieldsFragment
    )> }
  ) }
);

export type CmsImageFieldsFragment = (
  { __typename?: 'CmsImage' }
  & Pick<CmsImage, 'photographerCredit' | 'url'>
);

export type LocalizedCmsImageFieldsFragment = (
  { __typename?: 'LocalizedCmsImage' }
  & { en: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )>, fi: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )>, sv: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )> }
);

export type LandingPageFieldsFragment = (
  { __typename?: 'LandingPage' }
  & Pick<LandingPage, 'id'>
  & { pageTitle: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, metaInformation: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, keywords: Maybe<(
    { __typename?: 'LocalizedCmsKeywords' }
    & LocalizedCmsKeywordsFragment
  )>, title: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, description: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, titleAndDescriptionColor: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, buttonText: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, buttonUrl: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, heroBackgroundImage: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )>, heroBackgroundImageColor: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, heroBackgroundImageMobile: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )>, heroTopLayerImage: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )>, socialMediaImage: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )> }
);

export type LandingPageQueryVariables = {
  draft?: Maybe<Scalars['Boolean']>,
  id: Scalars['ID']
};


export type LandingPageQuery = (
  { __typename?: 'Query' }
  & { landingPage: (
    { __typename?: 'LandingPage' }
    & LandingPageFieldsFragment
  ) }
);

export type LandingPagesQueryVariables = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>
};


export type LandingPagesQuery = (
  { __typename?: 'Query' }
  & { landingPages: (
    { __typename?: 'LandingPagesResponse' }
    & { data: Array<(
      { __typename?: 'LandingPage' }
      & LandingPageFieldsFragment
    )> }
  ) }
);

export type NeighborhoodListQueryVariables = {};


export type NeighborhoodListQuery = (
  { __typename?: 'Query' }
  & { neighborhoodList: (
    { __typename?: 'NeighborhoodListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Neighborhood' }
      & Pick<Neighborhood, 'id'>
      & { name: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      ) }
    )> }
  ) }
);

export type OrganizationFieldsFragment = (
  { __typename?: 'OrganizationDetails' }
  & Pick<OrganizationDetails, 'id' | 'name'>
);

export type OrganizationDetailsQueryVariables = {
  id: Scalars['ID']
};


export type OrganizationDetailsQuery = (
  { __typename?: 'Query' }
  & { organizationDetails: (
    { __typename?: 'OrganizationDetails' }
    & OrganizationFieldsFragment
  ) }
);

export type PlaceFieldsFragment = (
  { __typename?: 'Place' }
  & Pick<Place, 'id' | 'hasUpcomingEvents' | 'internalId' | 'email' | 'postalCode'>
  & { divisions: Maybe<Array<(
    { __typename?: 'Division' }
    & Pick<Division, 'type'>
    & { name: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  )>>, infoUrl: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )>, name: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
  )>, addressLocality: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )>, streetAddress: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )>, position: Maybe<(
    { __typename?: 'PlacePosition' }
    & Pick<PlacePosition, 'coordinates'>
  )>, telephone: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )> }
);

export type PlaceDetailsQueryVariables = {
  id: Scalars['ID'],
  source?: Maybe<LinkedEventsSource>
};


export type PlaceDetailsQuery = (
  { __typename?: 'Query' }
  & { placeDetails: (
    { __typename?: 'Place' }
    & PlaceFieldsFragment
  ) }
);

export type PlaceListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>,
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>,
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllPlaces?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  source?: Maybe<LinkedEventsSource>
};


export type PlaceListQuery = (
  { __typename?: 'Query' }
  & { placeList: (
    { __typename?: 'PlaceListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Place' }
      & PlaceFieldsFragment
    )> }
  ) }
);

export const LocalizedFieldsFragmentDoc = gql`
    fragment localizedFields on LocalizedObject {
  en
  fi
  sv
}
    `;
export const LocalizedCmsKeywordsFragmentDoc = gql`
    fragment localizedCmsKeywords on LocalizedCmsKeywords {
  en
  fi
  sv
}
    `;
export const StaticPageFieldsFragmentDoc = gql`
    fragment staticPageFields on StaticPage {
  id
  expired
  headingSection {
    ...localizedFields
  }
  contentSection {
    ...localizedFields
  }
  keywords {
    ...localizedCmsKeywords
  }
}
    ${LocalizedFieldsFragmentDoc}
${LocalizedCmsKeywordsFragmentDoc}`;
export const CmsImageFieldsFragmentDoc = gql`
    fragment cmsImageFields on CmsImage {
  photographerCredit
  url
}
    `;
export const CollectionFieldsFragmentDoc = gql`
    fragment collectionFields on CollectionDetails {
  id
  heroImage {
    ...cmsImageFields
  }
  boxColor
  curatedEvents
  curatedEventsTitle {
    ...localizedFields
  }
  description {
    ...localizedFields
  }
  expired
  eventListQuery {
    ...localizedFields
  }
  eventListTitle {
    ...localizedFields
  }
  keywords {
    ...localizedCmsKeywords
  }
  linkText {
    ...localizedFields
  }
  linkUrl {
    ...localizedFields
  }
  slug
  socialMediaDescription {
    ...localizedFields
  }
  title {
    ...localizedFields
  }
}
    ${CmsImageFieldsFragmentDoc}
${LocalizedFieldsFragmentDoc}
${LocalizedCmsKeywordsFragmentDoc}`;
export const KeywordFieldsFragmentDoc = gql`
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
    `;
export const PlaceFieldsFragmentDoc = gql`
    fragment placeFields on Place {
  id
  divisions {
    type
    name {
      fi
      sv
      en
    }
  }
  hasUpcomingEvents
  internalId
  email
  infoUrl {
    fi
    sv
    en
  }
  name {
    fi
    en
    sv
  }
  addressLocality {
    fi
    sv
    en
  }
  streetAddress {
    fi
    sv
    en
  }
  postalCode
  position {
    coordinates
  }
  telephone {
    fi
    sv
    en
  }
}
    `;
export const OfferFieldsFragmentDoc = gql`
    fragment offerFields on Offer {
  isFree
  price {
    ...localizedFields
  }
  description {
    ...localizedFields
  }
  infoUrl {
    ...localizedFields
  }
}
    ${LocalizedFieldsFragmentDoc}`;
export const EventFieldsFragmentDoc = gql`
    fragment eventFields on EventDetails {
  id
  eventStatus
  externalLinks {
    name
    link
  }
  images {
    id
    name
    url
  }
  superEvent {
    internalId
  }
  inLanguage {
    name {
      ...localizedFields
    }
  }
  keywords {
    ...keywordFields
  }
  location {
    ...placeFields
  }
  offers {
    ...offerFields
  }
  name {
    ...localizedFields
  }
  description {
    ...localizedFields
  }
  shortDescription {
    ...localizedFields
  }
  endTime
  startTime
  publisher
  provider {
    ...localizedFields
  }
  infoUrl {
    ...localizedFields
  }
}
    ${LocalizedFieldsFragmentDoc}
${KeywordFieldsFragmentDoc}
${PlaceFieldsFragmentDoc}
${OfferFieldsFragmentDoc}`;
export const CourseFieldsFragmentDoc = gql`
    fragment courseFields on EventDetails {
  ...eventFields
  extensionCourse {
    enrolmentStartTime
    enrolmentEndTime
    maximumAttendeeCapacity
    minimumAttendeeCapacity
    remainingAttendeeCapacity
  }
}
    ${EventFieldsFragmentDoc}`;
export const LocalizedCmsImageFieldsFragmentDoc = gql`
    fragment localizedCmsImageFields on LocalizedCmsImage {
  en {
    ...cmsImageFields
  }
  fi {
    ...cmsImageFields
  }
  sv {
    ...cmsImageFields
  }
}
    ${CmsImageFieldsFragmentDoc}`;
export const LandingPageFieldsFragmentDoc = gql`
    fragment landingPageFields on LandingPage {
  id
  pageTitle {
    ...localizedFields
  }
  metaInformation {
    ...localizedFields
  }
  keywords {
    ...localizedCmsKeywords
  }
  title {
    ...localizedFields
  }
  description {
    ...localizedFields
  }
  titleAndDescriptionColor {
    ...localizedFields
  }
  buttonText {
    ...localizedFields
  }
  buttonUrl {
    ...localizedFields
  }
  heroBackgroundImage {
    ...localizedCmsImageFields
  }
  heroBackgroundImageColor {
    ...localizedFields
  }
  heroBackgroundImageMobile {
    ...localizedCmsImageFields
  }
  heroTopLayerImage {
    ...localizedCmsImageFields
  }
  socialMediaImage {
    ...localizedCmsImageFields
  }
}
    ${LocalizedFieldsFragmentDoc}
${LocalizedCmsKeywordsFragmentDoc}
${LocalizedCmsImageFieldsFragmentDoc}`;
export const OrganizationFieldsFragmentDoc = gql`
    fragment organizationFields on OrganizationDetails {
  id
  name
}
    `;
export const AboutPagesDocument = gql`
    query AboutPages {
  aboutPages {
    data {
      ...staticPageFields
    }
  }
}
    ${StaticPageFieldsFragmentDoc}`;
export type AboutPagesProps<TChildProps = {}> = ApolloReactHoc.DataProps<AboutPagesQuery, AboutPagesQueryVariables> | TChildProps;
export function withAboutPages<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AboutPagesQuery,
  AboutPagesQueryVariables,
  AboutPagesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AboutPagesQuery, AboutPagesQueryVariables, AboutPagesProps<TChildProps>>(AboutPagesDocument, {
      alias: 'aboutPages',
      ...operationOptions
    });
};

/**
 * __useAboutPagesQuery__
 *
 * To run a query within a React component, call `useAboutPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAboutPagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AboutPagesQuery, AboutPagesQueryVariables>) {
        return ApolloReactHooks.useQuery<AboutPagesQuery, AboutPagesQueryVariables>(AboutPagesDocument, baseOptions);
      }
export function useAboutPagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AboutPagesQuery, AboutPagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AboutPagesQuery, AboutPagesQueryVariables>(AboutPagesDocument, baseOptions);
        }
export type AboutPagesQueryHookResult = ReturnType<typeof useAboutPagesQuery>;
export type AboutPagesLazyQueryHookResult = ReturnType<typeof useAboutPagesLazyQuery>;
export type AboutPagesQueryResult = ApolloReactCommon.QueryResult<AboutPagesQuery, AboutPagesQueryVariables>;
export const AccessibilityPagesDocument = gql`
    query AccessibilityPages {
  accessibilityPages {
    data {
      ...staticPageFields
    }
  }
}
    ${StaticPageFieldsFragmentDoc}`;
export type AccessibilityPagesProps<TChildProps = {}> = ApolloReactHoc.DataProps<AccessibilityPagesQuery, AccessibilityPagesQueryVariables> | TChildProps;
export function withAccessibilityPages<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AccessibilityPagesQuery,
  AccessibilityPagesQueryVariables,
  AccessibilityPagesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AccessibilityPagesQuery, AccessibilityPagesQueryVariables, AccessibilityPagesProps<TChildProps>>(AccessibilityPagesDocument, {
      alias: 'accessibilityPages',
      ...operationOptions
    });
};

/**
 * __useAccessibilityPagesQuery__
 *
 * To run a query within a React component, call `useAccessibilityPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessibilityPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessibilityPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccessibilityPagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>) {
        return ApolloReactHooks.useQuery<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>(AccessibilityPagesDocument, baseOptions);
      }
export function useAccessibilityPagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>(AccessibilityPagesDocument, baseOptions);
        }
export type AccessibilityPagesQueryHookResult = ReturnType<typeof useAccessibilityPagesQuery>;
export type AccessibilityPagesLazyQueryHookResult = ReturnType<typeof useAccessibilityPagesLazyQuery>;
export type AccessibilityPagesQueryResult = ApolloReactCommon.QueryResult<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>;
export const CollectionDetailsDocument = gql`
    query CollectionDetails($draft: Boolean, $slug: ID!) {
  collectionDetails(draft: $draft, slug: $slug) {
    ...collectionFields
  }
}
    ${CollectionFieldsFragmentDoc}`;
export type CollectionDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<CollectionDetailsQuery, CollectionDetailsQueryVariables> | TChildProps;
export function withCollectionDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CollectionDetailsQuery,
  CollectionDetailsQueryVariables,
  CollectionDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CollectionDetailsQuery, CollectionDetailsQueryVariables, CollectionDetailsProps<TChildProps>>(CollectionDetailsDocument, {
      alias: 'collectionDetails',
      ...operationOptions
    });
};

/**
 * __useCollectionDetailsQuery__
 *
 * To run a query within a React component, call `useCollectionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionDetailsQuery({
 *   variables: {
 *      draft: // value for 'draft'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCollectionDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollectionDetailsQuery, CollectionDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<CollectionDetailsQuery, CollectionDetailsQueryVariables>(CollectionDetailsDocument, baseOptions);
      }
export function useCollectionDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollectionDetailsQuery, CollectionDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollectionDetailsQuery, CollectionDetailsQueryVariables>(CollectionDetailsDocument, baseOptions);
        }
export type CollectionDetailsQueryHookResult = ReturnType<typeof useCollectionDetailsQuery>;
export type CollectionDetailsLazyQueryHookResult = ReturnType<typeof useCollectionDetailsLazyQuery>;
export type CollectionDetailsQueryResult = ApolloReactCommon.QueryResult<CollectionDetailsQuery, CollectionDetailsQueryVariables>;
export const CollectionListDocument = gql`
    query CollectionList($visibleOnFrontpage: Boolean) {
  collectionList(visibleOnFrontpage: $visibleOnFrontpage) {
    data {
      ...collectionFields
    }
  }
}
    ${CollectionFieldsFragmentDoc}`;
export type CollectionListProps<TChildProps = {}> = ApolloReactHoc.DataProps<CollectionListQuery, CollectionListQueryVariables> | TChildProps;
export function withCollectionList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CollectionListQuery,
  CollectionListQueryVariables,
  CollectionListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CollectionListQuery, CollectionListQueryVariables, CollectionListProps<TChildProps>>(CollectionListDocument, {
      alias: 'collectionList',
      ...operationOptions
    });
};

/**
 * __useCollectionListQuery__
 *
 * To run a query within a React component, call `useCollectionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionListQuery({
 *   variables: {
 *      visibleOnFrontpage: // value for 'visibleOnFrontpage'
 *   },
 * });
 */
export function useCollectionListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
        return ApolloReactHooks.useQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, baseOptions);
      }
export function useCollectionListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, baseOptions);
        }
export type CollectionListQueryHookResult = ReturnType<typeof useCollectionListQuery>;
export type CollectionListLazyQueryHookResult = ReturnType<typeof useCollectionListLazyQuery>;
export type CollectionListQueryResult = ApolloReactCommon.QueryResult<CollectionListQuery, CollectionListQueryVariables>;
export const CourseDetailsDocument = gql`
    query CourseDetails($id: ID!, $include: [String]) {
  courseDetails(id: $id, include: $include) {
    ...courseFields
  }
}
    ${CourseFieldsFragmentDoc}`;
export type CourseDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<CourseDetailsQuery, CourseDetailsQueryVariables> | TChildProps;
export function withCourseDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CourseDetailsQuery,
  CourseDetailsQueryVariables,
  CourseDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CourseDetailsQuery, CourseDetailsQueryVariables, CourseDetailsProps<TChildProps>>(CourseDetailsDocument, {
      alias: 'courseDetails',
      ...operationOptions
    });
};

/**
 * __useCourseDetailsQuery__
 *
 * To run a query within a React component, call `useCourseDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useCourseDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CourseDetailsQuery, CourseDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<CourseDetailsQuery, CourseDetailsQueryVariables>(CourseDetailsDocument, baseOptions);
      }
export function useCourseDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CourseDetailsQuery, CourseDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CourseDetailsQuery, CourseDetailsQueryVariables>(CourseDetailsDocument, baseOptions);
        }
export type CourseDetailsQueryHookResult = ReturnType<typeof useCourseDetailsQuery>;
export type CourseDetailsLazyQueryHookResult = ReturnType<typeof useCourseDetailsLazyQuery>;
export type CourseDetailsQueryResult = ApolloReactCommon.QueryResult<CourseDetailsQuery, CourseDetailsQueryVariables>;
export const CourseListDocument = gql`
    query CourseList($combinedText: [String], $division: [String], $end: String, $endsAfter: String, $endsBefore: String, $inLanguage: String, $include: [String], $isFree: Boolean, $keyword: [String], $keywordAnd: [String], $keywordNot: [String], $language: String, $location: [String], $page: Int, $pageSize: Int, $publisher: ID, $sort: String, $start: String, $startsAfter: String, $startsBefore: String, $superEvent: ID, $superEventType: [String], $text: String, $translation: String) {
  courseList(combinedText: $combinedText, division: $division, end: $end, endsAfter: $endsAfter, endsBefore: $endsBefore, include: $include, inLanguage: $inLanguage, isFree: $isFree, keyword: $keyword, keywordAnd: $keywordAnd, keywordNot: $keywordNot, language: $language, location: $location, page: $page, pageSize: $pageSize, publisher: $publisher, sort: $sort, start: $start, startsAfter: $startsAfter, startsBefore: $startsBefore, superEvent: $superEvent, superEventType: $superEventType, text: $text, translation: $translation) {
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
    ${CourseFieldsFragmentDoc}`;
export type CourseListProps<TChildProps = {}> = ApolloReactHoc.DataProps<CourseListQuery, CourseListQueryVariables> | TChildProps;
export function withCourseList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CourseListQuery,
  CourseListQueryVariables,
  CourseListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CourseListQuery, CourseListQueryVariables, CourseListProps<TChildProps>>(CourseListDocument, {
      alias: 'courseList',
      ...operationOptions
    });
};

/**
 * __useCourseListQuery__
 *
 * To run a query within a React component, call `useCourseListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseListQuery({
 *   variables: {
 *      combinedText: // value for 'combinedText'
 *      division: // value for 'division'
 *      end: // value for 'end'
 *      endsAfter: // value for 'endsAfter'
 *      endsBefore: // value for 'endsBefore'
 *      inLanguage: // value for 'inLanguage'
 *      include: // value for 'include'
 *      isFree: // value for 'isFree'
 *      keyword: // value for 'keyword'
 *      keywordAnd: // value for 'keywordAnd'
 *      keywordNot: // value for 'keywordNot'
 *      language: // value for 'language'
 *      location: // value for 'location'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      publisher: // value for 'publisher'
 *      sort: // value for 'sort'
 *      start: // value for 'start'
 *      startsAfter: // value for 'startsAfter'
 *      startsBefore: // value for 'startsBefore'
 *      superEvent: // value for 'superEvent'
 *      superEventType: // value for 'superEventType'
 *      text: // value for 'text'
 *      translation: // value for 'translation'
 *   },
 * });
 */
export function useCourseListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CourseListQuery, CourseListQueryVariables>) {
        return ApolloReactHooks.useQuery<CourseListQuery, CourseListQueryVariables>(CourseListDocument, baseOptions);
      }
export function useCourseListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CourseListQuery, CourseListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CourseListQuery, CourseListQueryVariables>(CourseListDocument, baseOptions);
        }
export type CourseListQueryHookResult = ReturnType<typeof useCourseListQuery>;
export type CourseListLazyQueryHookResult = ReturnType<typeof useCourseListLazyQuery>;
export type CourseListQueryResult = ApolloReactCommon.QueryResult<CourseListQuery, CourseListQueryVariables>;
export const CoursesByIdsDocument = gql`
    query CoursesByIds($ids: [ID!]!, $include: [String]) {
  coursesByIds(ids: $ids, include: $include) {
    ...courseFields
  }
}
    ${CourseFieldsFragmentDoc}`;
export type CoursesByIdsProps<TChildProps = {}> = ApolloReactHoc.DataProps<CoursesByIdsQuery, CoursesByIdsQueryVariables> | TChildProps;
export function withCoursesByIds<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CoursesByIdsQuery,
  CoursesByIdsQueryVariables,
  CoursesByIdsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, CoursesByIdsQuery, CoursesByIdsQueryVariables, CoursesByIdsProps<TChildProps>>(CoursesByIdsDocument, {
      alias: 'coursesByIds',
      ...operationOptions
    });
};

/**
 * __useCoursesByIdsQuery__
 *
 * To run a query within a React component, call `useCoursesByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useCoursesByIdsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CoursesByIdsQuery, CoursesByIdsQueryVariables>) {
        return ApolloReactHooks.useQuery<CoursesByIdsQuery, CoursesByIdsQueryVariables>(CoursesByIdsDocument, baseOptions);
      }
export function useCoursesByIdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CoursesByIdsQuery, CoursesByIdsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CoursesByIdsQuery, CoursesByIdsQueryVariables>(CoursesByIdsDocument, baseOptions);
        }
export type CoursesByIdsQueryHookResult = ReturnType<typeof useCoursesByIdsQuery>;
export type CoursesByIdsLazyQueryHookResult = ReturnType<typeof useCoursesByIdsLazyQuery>;
export type CoursesByIdsQueryResult = ApolloReactCommon.QueryResult<CoursesByIdsQuery, CoursesByIdsQueryVariables>;
export const EventDetailsDocument = gql`
    query EventDetails($id: ID!, $include: [String]) {
  eventDetails(id: $id, include: $include) {
    ...eventFields
  }
}
    ${EventFieldsFragmentDoc}`;
export type EventDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<EventDetailsQuery, EventDetailsQueryVariables> | TChildProps;
export function withEventDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventDetailsQuery,
  EventDetailsQueryVariables,
  EventDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, EventDetailsQuery, EventDetailsQueryVariables, EventDetailsProps<TChildProps>>(EventDetailsDocument, {
      alias: 'eventDetails',
      ...operationOptions
    });
};

/**
 * __useEventDetailsQuery__
 *
 * To run a query within a React component, call `useEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useEventDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, baseOptions);
      }
export function useEventDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, baseOptions);
        }
export type EventDetailsQueryHookResult = ReturnType<typeof useEventDetailsQuery>;
export type EventDetailsLazyQueryHookResult = ReturnType<typeof useEventDetailsLazyQuery>;
export type EventDetailsQueryResult = ApolloReactCommon.QueryResult<EventDetailsQuery, EventDetailsQueryVariables>;
export const EventListDocument = gql`
    query EventList($combinedText: [String], $division: [String], $end: String, $endsAfter: String, $endsBefore: String, $inLanguage: String, $include: [String], $isFree: Boolean, $keyword: [String], $keywordAnd: [String], $keywordNot: [String], $language: String, $location: [String], $page: Int, $pageSize: Int, $publisher: ID, $sort: String, $start: String, $startsAfter: String, $startsBefore: String, $superEvent: ID, $superEventType: [String], $text: String, $translation: String) {
  eventList(combinedText: $combinedText, division: $division, end: $end, endsAfter: $endsAfter, endsBefore: $endsBefore, include: $include, inLanguage: $inLanguage, isFree: $isFree, keyword: $keyword, keywordAnd: $keywordAnd, keywordNot: $keywordNot, language: $language, location: $location, page: $page, pageSize: $pageSize, publisher: $publisher, sort: $sort, start: $start, startsAfter: $startsAfter, startsBefore: $startsBefore, superEvent: $superEvent, superEventType: $superEventType, text: $text, translation: $translation) {
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
    ${EventFieldsFragmentDoc}`;
export type EventListProps<TChildProps = {}> = ApolloReactHoc.DataProps<EventListQuery, EventListQueryVariables> | TChildProps;
export function withEventList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventListQuery,
  EventListQueryVariables,
  EventListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, EventListQuery, EventListQueryVariables, EventListProps<TChildProps>>(EventListDocument, {
      alias: 'eventList',
      ...operationOptions
    });
};

/**
 * __useEventListQuery__
 *
 * To run a query within a React component, call `useEventListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventListQuery({
 *   variables: {
 *      combinedText: // value for 'combinedText'
 *      division: // value for 'division'
 *      end: // value for 'end'
 *      endsAfter: // value for 'endsAfter'
 *      endsBefore: // value for 'endsBefore'
 *      inLanguage: // value for 'inLanguage'
 *      include: // value for 'include'
 *      isFree: // value for 'isFree'
 *      keyword: // value for 'keyword'
 *      keywordAnd: // value for 'keywordAnd'
 *      keywordNot: // value for 'keywordNot'
 *      language: // value for 'language'
 *      location: // value for 'location'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      publisher: // value for 'publisher'
 *      sort: // value for 'sort'
 *      start: // value for 'start'
 *      startsAfter: // value for 'startsAfter'
 *      startsBefore: // value for 'startsBefore'
 *      superEvent: // value for 'superEvent'
 *      superEventType: // value for 'superEventType'
 *      text: // value for 'text'
 *      translation: // value for 'translation'
 *   },
 * });
 */
export function useEventListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventListQuery, EventListQueryVariables>) {
        return ApolloReactHooks.useQuery<EventListQuery, EventListQueryVariables>(EventListDocument, baseOptions);
      }
export function useEventListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventListQuery, EventListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventListQuery, EventListQueryVariables>(EventListDocument, baseOptions);
        }
export type EventListQueryHookResult = ReturnType<typeof useEventListQuery>;
export type EventListLazyQueryHookResult = ReturnType<typeof useEventListLazyQuery>;
export type EventListQueryResult = ApolloReactCommon.QueryResult<EventListQuery, EventListQueryVariables>;
export const EventsByIdsDocument = gql`
    query EventsByIds($ids: [ID!]!, $include: [String]) {
  eventsByIds(ids: $ids, include: $include) {
    ...eventFields
  }
}
    ${EventFieldsFragmentDoc}`;
export type EventsByIdsProps<TChildProps = {}> = ApolloReactHoc.DataProps<EventsByIdsQuery, EventsByIdsQueryVariables> | TChildProps;
export function withEventsByIds<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventsByIdsQuery,
  EventsByIdsQueryVariables,
  EventsByIdsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, EventsByIdsQuery, EventsByIdsQueryVariables, EventsByIdsProps<TChildProps>>(EventsByIdsDocument, {
      alias: 'eventsByIds',
      ...operationOptions
    });
};

/**
 * __useEventsByIdsQuery__
 *
 * To run a query within a React component, call `useEventsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useEventsByIdsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventsByIdsQuery, EventsByIdsQueryVariables>) {
        return ApolloReactHooks.useQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(EventsByIdsDocument, baseOptions);
      }
export function useEventsByIdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventsByIdsQuery, EventsByIdsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(EventsByIdsDocument, baseOptions);
        }
export type EventsByIdsQueryHookResult = ReturnType<typeof useEventsByIdsQuery>;
export type EventsByIdsLazyQueryHookResult = ReturnType<typeof useEventsByIdsLazyQuery>;
export type EventsByIdsQueryResult = ApolloReactCommon.QueryResult<EventsByIdsQuery, EventsByIdsQueryVariables>;
export const KeywordDetailsDocument = gql`
    query KeywordDetails($id: ID!) {
  keywordDetails(id: $id) {
    ...keywordFields
  }
}
    ${KeywordFieldsFragmentDoc}`;
export type KeywordDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<KeywordDetailsQuery, KeywordDetailsQueryVariables> | TChildProps;
export function withKeywordDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordDetailsQuery,
  KeywordDetailsQueryVariables,
  KeywordDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordDetailsQuery, KeywordDetailsQueryVariables, KeywordDetailsProps<TChildProps>>(KeywordDetailsDocument, {
      alias: 'keywordDetails',
      ...operationOptions
    });
};

/**
 * __useKeywordDetailsQuery__
 *
 * To run a query within a React component, call `useKeywordDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKeywordDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, baseOptions);
      }
export function useKeywordDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, baseOptions);
        }
export type KeywordDetailsQueryHookResult = ReturnType<typeof useKeywordDetailsQuery>;
export type KeywordDetailsLazyQueryHookResult = ReturnType<typeof useKeywordDetailsLazyQuery>;
export type KeywordDetailsQueryResult = ApolloReactCommon.QueryResult<KeywordDetailsQuery, KeywordDetailsQueryVariables>;
export const KeywordListDocument = gql`
    query KeywordList($dataSource: String, $hasUpcomingEvents: Boolean, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String, $source: LinkedEventsSource) {
  keywordList(dataSource: $dataSource, hasUpcomingEvents: $hasUpcomingEvents, page: $page, pageSize: $pageSize, showAllKeywords: $showAllKeywords, sort: $sort, text: $text, source: $source) {
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
    ${KeywordFieldsFragmentDoc}`;
export type KeywordListProps<TChildProps = {}> = ApolloReactHoc.DataProps<KeywordListQuery, KeywordListQueryVariables> | TChildProps;
export function withKeywordList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordListQuery,
  KeywordListQueryVariables,
  KeywordListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordListQuery, KeywordListQueryVariables, KeywordListProps<TChildProps>>(KeywordListDocument, {
      alias: 'keywordList',
      ...operationOptions
    });
};

/**
 * __useKeywordListQuery__
 *
 * To run a query within a React component, call `useKeywordListQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      hasUpcomingEvents: // value for 'hasUpcomingEvents'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllKeywords: // value for 'showAllKeywords'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *      source: // value for 'source'
 *   },
 * });
 */
export function useKeywordListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, baseOptions);
      }
export function useKeywordListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, baseOptions);
        }
export type KeywordListQueryHookResult = ReturnType<typeof useKeywordListQuery>;
export type KeywordListLazyQueryHookResult = ReturnType<typeof useKeywordListLazyQuery>;
export type KeywordListQueryResult = ApolloReactCommon.QueryResult<KeywordListQuery, KeywordListQueryVariables>;
export const LandingPageDocument = gql`
    query LandingPage($draft: Boolean, $id: ID!) {
  landingPage(draft: $draft, id: $id) {
    ...landingPageFields
  }
}
    ${LandingPageFieldsFragmentDoc}`;
export type LandingPageProps<TChildProps = {}> = ApolloReactHoc.DataProps<LandingPageQuery, LandingPageQueryVariables> | TChildProps;
export function withLandingPage<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LandingPageQuery,
  LandingPageQueryVariables,
  LandingPageProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, LandingPageQuery, LandingPageQueryVariables, LandingPageProps<TChildProps>>(LandingPageDocument, {
      alias: 'landingPage',
      ...operationOptions
    });
};

/**
 * __useLandingPageQuery__
 *
 * To run a query within a React component, call `useLandingPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingPageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingPageQuery({
 *   variables: {
 *      draft: // value for 'draft'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLandingPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LandingPageQuery, LandingPageQueryVariables>) {
        return ApolloReactHooks.useQuery<LandingPageQuery, LandingPageQueryVariables>(LandingPageDocument, baseOptions);
      }
export function useLandingPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LandingPageQuery, LandingPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LandingPageQuery, LandingPageQueryVariables>(LandingPageDocument, baseOptions);
        }
export type LandingPageQueryHookResult = ReturnType<typeof useLandingPageQuery>;
export type LandingPageLazyQueryHookResult = ReturnType<typeof useLandingPageLazyQuery>;
export type LandingPageQueryResult = ApolloReactCommon.QueryResult<LandingPageQuery, LandingPageQueryVariables>;
export const LandingPagesDocument = gql`
    query LandingPages($visibleOnFrontpage: Boolean) {
  landingPages(visibleOnFrontpage: $visibleOnFrontpage) {
    data {
      ...landingPageFields
    }
  }
}
    ${LandingPageFieldsFragmentDoc}`;
export type LandingPagesProps<TChildProps = {}> = ApolloReactHoc.DataProps<LandingPagesQuery, LandingPagesQueryVariables> | TChildProps;
export function withLandingPages<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LandingPagesQuery,
  LandingPagesQueryVariables,
  LandingPagesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, LandingPagesQuery, LandingPagesQueryVariables, LandingPagesProps<TChildProps>>(LandingPagesDocument, {
      alias: 'landingPages',
      ...operationOptions
    });
};

/**
 * __useLandingPagesQuery__
 *
 * To run a query within a React component, call `useLandingPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingPagesQuery({
 *   variables: {
 *      visibleOnFrontpage: // value for 'visibleOnFrontpage'
 *   },
 * });
 */
export function useLandingPagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LandingPagesQuery, LandingPagesQueryVariables>) {
        return ApolloReactHooks.useQuery<LandingPagesQuery, LandingPagesQueryVariables>(LandingPagesDocument, baseOptions);
      }
export function useLandingPagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LandingPagesQuery, LandingPagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LandingPagesQuery, LandingPagesQueryVariables>(LandingPagesDocument, baseOptions);
        }
export type LandingPagesQueryHookResult = ReturnType<typeof useLandingPagesQuery>;
export type LandingPagesLazyQueryHookResult = ReturnType<typeof useLandingPagesLazyQuery>;
export type LandingPagesQueryResult = ApolloReactCommon.QueryResult<LandingPagesQuery, LandingPagesQueryVariables>;
export const NeighborhoodListDocument = gql`
    query NeighborhoodList {
  neighborhoodList {
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
export type NeighborhoodListProps<TChildProps = {}> = ApolloReactHoc.DataProps<NeighborhoodListQuery, NeighborhoodListQueryVariables> | TChildProps;
export function withNeighborhoodList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NeighborhoodListQuery,
  NeighborhoodListQueryVariables,
  NeighborhoodListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, NeighborhoodListQuery, NeighborhoodListQueryVariables, NeighborhoodListProps<TChildProps>>(NeighborhoodListDocument, {
      alias: 'neighborhoodList',
      ...operationOptions
    });
};

/**
 * __useNeighborhoodListQuery__
 *
 * To run a query within a React component, call `useNeighborhoodListQuery` and pass it any options that fit your needs.
 * When your component renders, `useNeighborhoodListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNeighborhoodListQuery({
 *   variables: {
 *   },
 * });
 */
export function useNeighborhoodListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NeighborhoodListQuery, NeighborhoodListQueryVariables>) {
        return ApolloReactHooks.useQuery<NeighborhoodListQuery, NeighborhoodListQueryVariables>(NeighborhoodListDocument, baseOptions);
      }
export function useNeighborhoodListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NeighborhoodListQuery, NeighborhoodListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NeighborhoodListQuery, NeighborhoodListQueryVariables>(NeighborhoodListDocument, baseOptions);
        }
export type NeighborhoodListQueryHookResult = ReturnType<typeof useNeighborhoodListQuery>;
export type NeighborhoodListLazyQueryHookResult = ReturnType<typeof useNeighborhoodListLazyQuery>;
export type NeighborhoodListQueryResult = ApolloReactCommon.QueryResult<NeighborhoodListQuery, NeighborhoodListQueryVariables>;
export const OrganizationDetailsDocument = gql`
    query OrganizationDetails($id: ID!) {
  organizationDetails(id: $id) {
    ...organizationFields
  }
}
    ${OrganizationFieldsFragmentDoc}`;
export type OrganizationDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<OrganizationDetailsQuery, OrganizationDetailsQueryVariables> | TChildProps;
export function withOrganizationDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OrganizationDetailsQuery,
  OrganizationDetailsQueryVariables,
  OrganizationDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, OrganizationDetailsQuery, OrganizationDetailsQueryVariables, OrganizationDetailsProps<TChildProps>>(OrganizationDetailsDocument, {
      alias: 'organizationDetails',
      ...operationOptions
    });
};

/**
 * __useOrganizationDetailsQuery__
 *
 * To run a query within a React component, call `useOrganizationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganizationDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, baseOptions);
      }
export function useOrganizationDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, baseOptions);
        }
export type OrganizationDetailsQueryHookResult = ReturnType<typeof useOrganizationDetailsQuery>;
export type OrganizationDetailsLazyQueryHookResult = ReturnType<typeof useOrganizationDetailsLazyQuery>;
export type OrganizationDetailsQueryResult = ApolloReactCommon.QueryResult<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>;
export const PlaceDetailsDocument = gql`
    query PlaceDetails($id: ID!, $source: LinkedEventsSource) {
  placeDetails(id: $id, source: $source) {
    ...placeFields
  }
}
    ${PlaceFieldsFragmentDoc}`;
export type PlaceDetailsProps<TChildProps = {}> = ApolloReactHoc.DataProps<PlaceDetailsQuery, PlaceDetailsQueryVariables> | TChildProps;
export function withPlaceDetails<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlaceDetailsQuery,
  PlaceDetailsQueryVariables,
  PlaceDetailsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PlaceDetailsQuery, PlaceDetailsQueryVariables, PlaceDetailsProps<TChildProps>>(PlaceDetailsDocument, {
      alias: 'placeDetails',
      ...operationOptions
    });
};

/**
 * __usePlaceDetailsQuery__
 *
 * To run a query within a React component, call `usePlaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      source: // value for 'source'
 *   },
 * });
 */
export function usePlaceDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
      }
export function usePlaceDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
        }
export type PlaceDetailsQueryHookResult = ReturnType<typeof usePlaceDetailsQuery>;
export type PlaceDetailsLazyQueryHookResult = ReturnType<typeof usePlaceDetailsLazyQuery>;
export type PlaceDetailsQueryResult = ApolloReactCommon.QueryResult<PlaceDetailsQuery, PlaceDetailsQueryVariables>;
export const PlaceListDocument = gql`
    query PlaceList($dataSource: String, $divisions: [String], $hasUpcomingEvents: Boolean, $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String, $source: LinkedEventsSource) {
  placeList(dataSource: $dataSource, divisions: $divisions, hasUpcomingEvents: $hasUpcomingEvents, page: $page, pageSize: $pageSize, showAllPlaces: $showAllPlaces, sort: $sort, text: $text, source: $source) {
    meta {
      count
      next
      previous
    }
    data {
      ...placeFields
    }
  }
}
    ${PlaceFieldsFragmentDoc}`;
export type PlaceListProps<TChildProps = {}> = ApolloReactHoc.DataProps<PlaceListQuery, PlaceListQueryVariables> | TChildProps;
export function withPlaceList<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlaceListQuery,
  PlaceListQueryVariables,
  PlaceListProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PlaceListQuery, PlaceListQueryVariables, PlaceListProps<TChildProps>>(PlaceListDocument, {
      alias: 'placeList',
      ...operationOptions
    });
};

/**
 * __usePlaceListQuery__
 *
 * To run a query within a React component, call `usePlaceListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      divisions: // value for 'divisions'
 *      hasUpcomingEvents: // value for 'hasUpcomingEvents'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllPlaces: // value for 'showAllPlaces'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *      source: // value for 'source'
 *   },
 * });
 */
export function usePlaceListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, baseOptions);
      }
export function usePlaceListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, baseOptions);
        }
export type PlaceListQueryHookResult = ReturnType<typeof usePlaceListQuery>;
export type PlaceListLazyQueryHookResult = ReturnType<typeof usePlaceListLazyQuery>;
export type PlaceListQueryResult = ApolloReactCommon.QueryResult<PlaceListQuery, PlaceListQueryVariables>;