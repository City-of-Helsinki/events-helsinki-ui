import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AboutPagesResponse = {
  __typename?: 'AboutPagesResponse';
  data: Array<StaticPage>;
};

export type AccessibilityPagesResponse = {
  __typename?: 'AccessibilityPagesResponse';
  data: Array<StaticPage>;
};

export type Audience = {
  __typename?: 'Audience';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type BannerPage = {
  __typename?: 'BannerPage';
  title?: Maybe<LocalizedObject>;
  description?: Maybe<LocalizedObject>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  titleAndDescriptionColor?: Maybe<LocalizedObject>;
  buttonText?: Maybe<LocalizedObject>;
  buttonUrl?: Maybe<LocalizedObject>;
  heroBackgroundImage?: Maybe<LocalizedCmsImage>;
  heroBackgroundImageMobile?: Maybe<LocalizedCmsImage>;
  heroBackgroundImageColor?: Maybe<LocalizedObject>;
  heroTopLayerImage?: Maybe<LocalizedCmsImage>;
  socialMediaImage?: Maybe<LocalizedCmsImage>;
};

export type CmsImage = {
  __typename?: 'CmsImage';
  photographerCredit?: Maybe<LocalizedObject>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CollectionDetails = {
  __typename?: 'CollectionDetails';
  id: Scalars['ID'];
  boxColor?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['Int']>;
  curatedEvents: Array<Scalars['String']>;
  curatedEventsTitle?: Maybe<LocalizedObject>;
  depth?: Maybe<Scalars['Int']>;
  description?: Maybe<LocalizedObject>;
  draftTitle?: Maybe<Scalars['String']>;
  eventListQuery?: Maybe<LocalizedObject>;
  eventListTitle?: Maybe<LocalizedObject>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  heroImage?: Maybe<CmsImage>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  linkText?: Maybe<LocalizedObject>;
  linkUrl?: Maybe<LocalizedObject>;
  live?: Maybe<Scalars['Boolean']>;
  liveRevision?: Maybe<Scalars['Int']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  lockedBy?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  searchDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  slug: Scalars['ID'];
  socialMediaDescription?: Maybe<LocalizedObject>;
  title: LocalizedObject;
  urlPath?: Maybe<Scalars['String']>;
};

export type CollectionListResponse = {
  __typename?: 'CollectionListResponse';
  data: Array<CollectionDetails>;
};

export type Division = {
  __typename?: 'Division';
  type: Scalars['String'];
  ocdId?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  name?: Maybe<LocalizedObject>;
};

export type EventDetails = {
  __typename?: 'EventDetails';
  id: Scalars['ID'];
  typeId?: Maybe<EventTypeId>;
  location?: Maybe<Place>;
  keywords: Array<Keyword>;
  superEvent?: Maybe<InternalIdObject>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks: Array<ExternalLink>;
  offers: Array<Offer>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  subEvents: Array<InternalIdObject>;
  images: Array<Image>;
  inLanguage: Array<InLanguage>;
  audience: Array<Audience>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  name: LocalizedObject;
  locationExtraInfo?: Maybe<LocalizedObject>;
  shortDescription?: Maybe<LocalizedObject>;
  provider?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  enrolmentStartTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  meta: Meta;
  data: Array<EventDetails>;
};

export enum EventTypeId {
  General = 'General',
  Course = 'Course'
}

export type ExternalLink = {
  __typename?: 'ExternalLink';
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['ID']>;
  license?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  cropping?: Maybe<Scalars['String']>;
  photographerName?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type InLanguage = {
  __typename?: 'InLanguage';
  id?: Maybe<Scalars['ID']>;
  translationAvailable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type InternalIdObject = {
  __typename?: 'InternalIdObject';
  internalId?: Maybe<Scalars['String']>;
};

export type Keyword = {
  __typename?: 'Keyword';
  id?: Maybe<Scalars['ID']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdTime?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  aggregate?: Maybe<Scalars['Boolean']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Image>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  name?: Maybe<LocalizedObject>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type KeywordListResponse = {
  __typename?: 'KeywordListResponse';
  meta: Meta;
  data: Array<Keyword>;
};

export type LandingPage = {
  __typename?: 'LandingPage';
  id: Scalars['ID'];
  topBanner?: Maybe<BannerPage>;
  bottomBanner?: Maybe<BannerPage>;
  path?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  draftTitle?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  live?: Maybe<Scalars['Boolean']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  urlPath?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  searchDescription?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  title?: Maybe<LocalizedObject>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  metaInformation?: Maybe<LocalizedObject>;
  pageTitle?: Maybe<LocalizedObject>;
  contentType?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  lockedBy?: Maybe<Scalars['Int']>;
  liveRevision?: Maybe<Scalars['Int']>;
};

export type LandingPagesResponse = {
  __typename?: 'LandingPagesResponse';
  data: Array<LandingPage>;
};

export type LocalizedCmsImage = {
  __typename?: 'LocalizedCmsImage';
  en?: Maybe<CmsImage>;
  fi?: Maybe<CmsImage>;
  sv?: Maybe<CmsImage>;
};

export type LocalizedCmsKeywords = {
  __typename?: 'LocalizedCmsKeywords';
  en?: Maybe<Array<Maybe<Scalars['String']>>>;
  fi?: Maybe<Array<Maybe<Scalars['String']>>>;
  sv?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LocalizedObject = {
  __typename?: 'LocalizedObject';
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type Meta = {
  __typename?: 'Meta';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  id: Scalars['ID'];
  name: LocalizedObject;
};

export type NeighborhoodListResponse = {
  __typename?: 'NeighborhoodListResponse';
  meta: Meta;
  data: Array<Neighborhood>;
};

export type Offer = {
  __typename?: 'Offer';
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalizedObject>;
  price?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
};

export type OrganizationDetails = {
  __typename?: 'OrganizationDetails';
  id?: Maybe<Scalars['ID']>;
  dataSource?: Maybe<Scalars['String']>;
  classification?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  foundingDate?: Maybe<Scalars['String']>;
  dissolutionDate?: Maybe<Scalars['String']>;
  parentOrganization?: Maybe<Scalars['String']>;
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  isAffiliated: Scalars['Boolean'];
  replacedBy?: Maybe<Scalars['String']>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type Place = {
  __typename?: 'Place';
  id?: Maybe<Scalars['ID']>;
  divisions?: Maybe<Array<Division>>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contactType?: Maybe<Scalars['String']>;
  addressRegion?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  postOfficeBoxNum?: Maybe<Scalars['String']>;
  addressCountry?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Image>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  parent?: Maybe<Scalars['ID']>;
  replacedBy?: Maybe<Scalars['String']>;
  position?: Maybe<PlacePosition>;
  name?: Maybe<LocalizedObject>;
  description?: Maybe<Scalars['String']>;
  telephone?: Maybe<LocalizedObject>;
  addressLocality?: Maybe<LocalizedObject>;
  streetAddress?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  internalId: Scalars['String'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type PlaceListResponse = {
  __typename?: 'PlaceListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type PlacePosition = {
  __typename?: 'PlacePosition';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  aboutPages: AboutPagesResponse;
  accessibilityPages: AccessibilityPagesResponse;
  collectionDetails: CollectionDetails;
  collectionList: CollectionListResponse;
  eventDetails: EventDetails;
  eventsByIds: EventListResponse;
  eventList: EventListResponse;
  keywordDetails: Keyword;
  keywordList: KeywordListResponse;
  landingPage: LandingPage;
  landingPages: LandingPagesResponse;
  neighborhoodList: NeighborhoodListResponse;
  organizationDetails: OrganizationDetails;
  placeDetails: Place;
  placeList: PlaceListResponse;
};


export type QueryCollectionDetailsArgs = {
  slug?: Maybe<Scalars['ID']>;
  draft?: Maybe<Scalars['Boolean']>;
};


export type QueryCollectionListArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};


export type QueryEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryEventsByIdsArgs = {
  eventType?: Maybe<Array<Maybe<EventTypeId>>>;
  ids: Array<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  sort?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};


export type QueryEventListArgs = {
  eventType?: Maybe<Array<Maybe<EventTypeId>>>;
  internetBased?: Maybe<Scalars['Boolean']>;
  localOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOr?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOrSet1?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOrSet2?: Maybe<Array<Maybe<Scalars['String']>>>;
  localOngoingOrSet3?: Maybe<Array<Maybe<Scalars['String']>>>;
  internetOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  internetOngoingOr?: Maybe<Array<Maybe<Scalars['String']>>>;
  allOngoing?: Maybe<Scalars['Boolean']>;
  allOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  allOngoingOr?: Maybe<Array<Maybe<Scalars['String']>>>;
  combinedText?: Maybe<Array<Maybe<Scalars['String']>>>;
  division?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  endsAfter?: Maybe<Scalars['String']>;
  endsBefore?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Maybe<Scalars['String']>>>;
  inLanguage?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  isFree?: Maybe<Scalars['Boolean']>;
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet1?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet2?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet3?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  location?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  startsAfter?: Maybe<Scalars['String']>;
  startsBefore?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
  suitableFor?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryKeywordDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryKeywordListArgs = {
  dataSource?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type QueryLandingPageArgs = {
  draft?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type QueryLandingPagesArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};


export type QueryOrganizationDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryPlaceDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryPlaceListArgs = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type StaticPage = {
  __typename?: 'StaticPage';
  id: Scalars['ID'];
  path?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  draftTitle?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  live?: Maybe<Scalars['Boolean']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  urlPath?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  searchDescription?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  keywords?: Maybe<LocalizedCmsKeywords>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  headingSection?: Maybe<LocalizedObject>;
  contentSection?: Maybe<LocalizedObject>;
  contentYype?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  lockedBy?: Maybe<Scalars['String']>;
  liveRevision?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};

export type LocalizedCmsKeywordsFragment = (
  { __typename?: 'LocalizedCmsKeywords' }
  & Pick<LocalizedCmsKeywords, 'en' | 'fi' | 'sv'>
);

export type StaticPageFieldsFragment = (
  { __typename?: 'StaticPage' }
  & Pick<StaticPage, 'id' | 'expired'>
  & { headingSection?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, contentSection?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, keywords?: Maybe<(
    { __typename?: 'LocalizedCmsKeywords' }
    & LocalizedCmsKeywordsFragment
  )> }
);

export type AboutPagesQueryVariables = Exact<{ [key: string]: never; }>;


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

export type AccessibilityPagesQueryVariables = Exact<{ [key: string]: never; }>;


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
  & Pick<CollectionDetails, 'id' | 'boxColor' | 'curatedEvents' | 'expired' | 'live' | 'slug'>
  & { heroImage?: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )>, curatedEventsTitle?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, description?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, eventListQuery?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, eventListTitle?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, keywords?: Maybe<(
    { __typename?: 'LocalizedCmsKeywords' }
    & LocalizedCmsKeywordsFragment
  )>, linkText?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, linkUrl?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, socialMediaDescription?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, title: (
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  ) }
);

export type CollectionDetailsQueryVariables = Exact<{
  draft?: Maybe<Scalars['Boolean']>;
  slug: Scalars['ID'];
}>;


export type CollectionDetailsQuery = (
  { __typename?: 'Query' }
  & { collectionDetails: (
    { __typename?: 'CollectionDetails' }
    & CollectionFieldsFragment
  ) }
);

export type CollectionListQueryVariables = Exact<{
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
}>;


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

export type LocalizedFieldsFragment = (
  { __typename?: 'LocalizedObject' }
  & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
);

export type OfferFieldsFragment = (
  { __typename?: 'Offer' }
  & Pick<Offer, 'isFree'>
  & { price?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, description?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, infoUrl?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )> }
);

export type EventFieldsFragment = (
  { __typename?: 'EventDetails' }
  & Pick<EventDetails, 'audienceMinAge' | 'audienceMaxAge' | 'id' | 'eventStatus' | 'typeId' | 'endTime' | 'startTime' | 'publisher'>
  & { externalLinks: Array<(
    { __typename?: 'ExternalLink' }
    & Pick<ExternalLink, 'name' | 'link'>
  )>, images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'name' | 'url' | 'photographerName'>
  )>, subEvents: Array<(
    { __typename?: 'InternalIdObject' }
    & Pick<InternalIdObject, 'internalId'>
  )>, superEvent?: Maybe<(
    { __typename?: 'InternalIdObject' }
    & Pick<InternalIdObject, 'internalId'>
  )>, inLanguage: Array<(
    { __typename?: 'InLanguage' }
    & { name?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & LocalizedFieldsFragment
    )> }
  )>, keywords: Array<(
    { __typename?: 'Keyword' }
    & KeywordFieldsFragment
  )>, location?: Maybe<(
    { __typename?: 'Place' }
    & PlaceFieldsFragment
  )>, offers: Array<(
    { __typename?: 'Offer' }
    & OfferFieldsFragment
  )>, name: (
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  ), description?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, shortDescription?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, provider?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, infoUrl?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, audience: Array<(
    { __typename?: 'Audience' }
    & Pick<Audience, 'id'>
    & { name?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & LocalizedFieldsFragment
    )> }
  )> }
);

export type EventDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  include?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type EventDetailsQuery = (
  { __typename?: 'Query' }
  & { eventDetails: (
    { __typename?: 'EventDetails' }
    & EventFieldsFragment
  ) }
);

export type EventListQueryVariables = Exact<{
  eventType?: Maybe<Array<Maybe<EventTypeId>> | Maybe<EventTypeId>>;
  internetBased?: Maybe<Scalars['Boolean']>;
  suitableFor?: Maybe<Array<Maybe<Scalars['Int']>> | Maybe<Scalars['Int']>>;
  allOngoing?: Maybe<Scalars['Boolean']>;
  allOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  division?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  end?: Maybe<Scalars['String']>;
  endsAfter?: Maybe<Scalars['String']>;
  endsBefore?: Maybe<Scalars['String']>;
  inLanguage?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  isFree?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  keywordOrSet1?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  keywordOrSet2?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  keywordOrSet3?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  language?: Maybe<Scalars['String']>;
  localOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  location?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  startsAfter?: Maybe<Scalars['String']>;
  startsBefore?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
}>;


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

export type EventsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
  eventType?: Maybe<Array<Maybe<EventTypeId>> | Maybe<EventTypeId>>;
  include?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  sort?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
}>;


export type EventsByIdsQuery = (
  { __typename?: 'Query' }
  & { eventsByIds: (
    { __typename?: 'EventListResponse' }
    & { data: Array<(
      { __typename?: 'EventDetails' }
      & EventFieldsFragment
    )>, meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ) }
  ) }
);

export type KeywordFieldsFragment = (
  { __typename?: 'Keyword' }
  & Pick<Keyword, 'id' | 'internalId' | 'dataSource' | 'hasUpcomingEvents'>
  & { name?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )> }
);

export type KeywordDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type KeywordDetailsQuery = (
  { __typename?: 'Query' }
  & { keywordDetails: (
    { __typename?: 'Keyword' }
    & KeywordFieldsFragment
  ) }
);

export type KeywordListQueryVariables = Exact<{
  dataSource?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
}>;


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
  & Pick<CmsImage, 'url'>
  & { photographerCredit?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )> }
);

export type LocalizedCmsImageFieldsFragment = (
  { __typename?: 'LocalizedCmsImage' }
  & { en?: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )>, fi?: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )>, sv?: Maybe<(
    { __typename?: 'CmsImage' }
    & CmsImageFieldsFragment
  )> }
);

export type LandingPageFieldsFragment = (
  { __typename?: 'LandingPage' }
  & Pick<LandingPage, 'id'>
  & { pageTitle?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, metaInformation?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, keywords?: Maybe<(
    { __typename?: 'LocalizedCmsKeywords' }
    & LocalizedCmsKeywordsFragment
  )>, topBanner?: Maybe<(
    { __typename?: 'BannerPage' }
    & BannerPageFieldsFragment
  )>, bottomBanner?: Maybe<(
    { __typename?: 'BannerPage' }
    & BannerPageFieldsFragment
  )> }
);

export type BannerPageFieldsFragment = (
  { __typename?: 'BannerPage' }
  & { title?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, description?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, keywords?: Maybe<(
    { __typename?: 'LocalizedCmsKeywords' }
    & LocalizedCmsKeywordsFragment
  )>, titleAndDescriptionColor?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, buttonText?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, buttonUrl?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, heroBackgroundImage?: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )>, heroBackgroundImageColor?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & LocalizedFieldsFragment
  )>, heroBackgroundImageMobile?: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )>, heroTopLayerImage?: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )>, socialMediaImage?: Maybe<(
    { __typename?: 'LocalizedCmsImage' }
    & LocalizedCmsImageFieldsFragment
  )> }
);

export type LandingPageQueryVariables = Exact<{
  draft?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
}>;


export type LandingPageQuery = (
  { __typename?: 'Query' }
  & { landingPage: (
    { __typename?: 'LandingPage' }
    & LandingPageFieldsFragment
  ) }
);

export type LandingPagesQueryVariables = Exact<{
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
}>;


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

export type NeighborhoodListQueryVariables = Exact<{ [key: string]: never; }>;


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

export type OrganizationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


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
  & { divisions?: Maybe<Array<(
    { __typename?: 'Division' }
    & Pick<Division, 'type'>
    & { name?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  )>>, infoUrl?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )>, name?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
  )>, addressLocality?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )>, streetAddress?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )>, position?: Maybe<(
    { __typename?: 'PlacePosition' }
    & Pick<PlacePosition, 'coordinates'>
  )>, telephone?: Maybe<(
    { __typename?: 'LocalizedObject' }
    & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
  )> }
);

export type PlaceDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaceDetailsQuery = (
  { __typename?: 'Query' }
  & { placeDetails: (
    { __typename?: 'Place' }
    & PlaceFieldsFragment
  ) }
);

export type PlaceListQueryVariables = Exact<{
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
}>;


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
  photographerCredit {
    ...localizedFields
  }
  url
}
    ${LocalizedFieldsFragmentDoc}`;
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
  live
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
  audienceMinAge
  audienceMaxAge
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
    photographerName
  }
  subEvents {
    internalId
  }
  typeId
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
  audience {
    id
    name {
      ...localizedFields
    }
  }
}
    ${LocalizedFieldsFragmentDoc}
${KeywordFieldsFragmentDoc}
${PlaceFieldsFragmentDoc}
${OfferFieldsFragmentDoc}`;
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
export const BannerPageFieldsFragmentDoc = gql`
    fragment BannerPageFields on BannerPage {
  title {
    ...localizedFields
  }
  description {
    ...localizedFields
  }
  keywords {
    ...localizedCmsKeywords
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
  topBanner {
    ...BannerPageFields
  }
  bottomBanner {
    ...BannerPageFields
  }
}
    ${LocalizedFieldsFragmentDoc}
${LocalizedCmsKeywordsFragmentDoc}
${BannerPageFieldsFragmentDoc}`;
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
export function useAboutPagesQuery(baseOptions?: Apollo.QueryHookOptions<AboutPagesQuery, AboutPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AboutPagesQuery, AboutPagesQueryVariables>(AboutPagesDocument, options);
      }
export function useAboutPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AboutPagesQuery, AboutPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AboutPagesQuery, AboutPagesQueryVariables>(AboutPagesDocument, options);
        }
export type AboutPagesQueryHookResult = ReturnType<typeof useAboutPagesQuery>;
export type AboutPagesLazyQueryHookResult = ReturnType<typeof useAboutPagesLazyQuery>;
export type AboutPagesQueryResult = Apollo.QueryResult<AboutPagesQuery, AboutPagesQueryVariables>;
export const AccessibilityPagesDocument = gql`
    query AccessibilityPages {
  accessibilityPages {
    data {
      ...staticPageFields
    }
  }
}
    ${StaticPageFieldsFragmentDoc}`;

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
export function useAccessibilityPagesQuery(baseOptions?: Apollo.QueryHookOptions<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>(AccessibilityPagesDocument, options);
      }
export function useAccessibilityPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>(AccessibilityPagesDocument, options);
        }
export type AccessibilityPagesQueryHookResult = ReturnType<typeof useAccessibilityPagesQuery>;
export type AccessibilityPagesLazyQueryHookResult = ReturnType<typeof useAccessibilityPagesLazyQuery>;
export type AccessibilityPagesQueryResult = Apollo.QueryResult<AccessibilityPagesQuery, AccessibilityPagesQueryVariables>;
export const CollectionDetailsDocument = gql`
    query CollectionDetails($draft: Boolean, $slug: ID!) {
  collectionDetails(draft: $draft, slug: $slug) {
    ...collectionFields
  }
}
    ${CollectionFieldsFragmentDoc}`;

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
export function useCollectionDetailsQuery(baseOptions: Apollo.QueryHookOptions<CollectionDetailsQuery, CollectionDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionDetailsQuery, CollectionDetailsQueryVariables>(CollectionDetailsDocument, options);
      }
export function useCollectionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionDetailsQuery, CollectionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionDetailsQuery, CollectionDetailsQueryVariables>(CollectionDetailsDocument, options);
        }
export type CollectionDetailsQueryHookResult = ReturnType<typeof useCollectionDetailsQuery>;
export type CollectionDetailsLazyQueryHookResult = ReturnType<typeof useCollectionDetailsLazyQuery>;
export type CollectionDetailsQueryResult = Apollo.QueryResult<CollectionDetailsQuery, CollectionDetailsQueryVariables>;
export const CollectionListDocument = gql`
    query CollectionList($visibleOnFrontpage: Boolean) {
  collectionList(visibleOnFrontpage: $visibleOnFrontpage) {
    data {
      ...collectionFields
    }
  }
}
    ${CollectionFieldsFragmentDoc}`;

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
export function useCollectionListQuery(baseOptions?: Apollo.QueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, options);
      }
export function useCollectionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionListQuery, CollectionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionListQuery, CollectionListQueryVariables>(CollectionListDocument, options);
        }
export type CollectionListQueryHookResult = ReturnType<typeof useCollectionListQuery>;
export type CollectionListLazyQueryHookResult = ReturnType<typeof useCollectionListLazyQuery>;
export type CollectionListQueryResult = Apollo.QueryResult<CollectionListQuery, CollectionListQueryVariables>;
export const EventDetailsDocument = gql`
    query EventDetails($id: ID!, $include: [String]) {
  eventDetails(id: $id, include: $include) {
    ...eventFields
  }
}
    ${EventFieldsFragmentDoc}`;

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
export function useEventDetailsQuery(baseOptions: Apollo.QueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, options);
      }
export function useEventDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, options);
        }
export type EventDetailsQueryHookResult = ReturnType<typeof useEventDetailsQuery>;
export type EventDetailsLazyQueryHookResult = ReturnType<typeof useEventDetailsLazyQuery>;
export type EventDetailsQueryResult = Apollo.QueryResult<EventDetailsQuery, EventDetailsQueryVariables>;
export const EventListDocument = gql`
    query EventList($eventType: [EventTypeId], $internetBased: Boolean, $suitableFor: [Int], $allOngoing: Boolean, $allOngoingAnd: [String], $division: [String], $end: String, $endsAfter: String, $endsBefore: String, $inLanguage: String, $include: [String], $isFree: Boolean, $keyword: [String], $keywordAnd: [String], $keywordOrSet1: [String], $keywordOrSet2: [String], $keywordOrSet3: [String], $keywordNot: [String], $language: String, $localOngoingAnd: [String], $location: [String], $page: Int, $pageSize: Int, $publisher: ID, $sort: String, $start: String, $startsAfter: String, $startsBefore: String, $superEvent: ID, $superEventType: [String], $text: String, $translation: String) {
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
    ${EventFieldsFragmentDoc}`;

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
 *      eventType: // value for 'eventType'
 *      internetBased: // value for 'internetBased'
 *      suitableFor: // value for 'suitableFor'
 *      allOngoing: // value for 'allOngoing'
 *      allOngoingAnd: // value for 'allOngoingAnd'
 *      division: // value for 'division'
 *      end: // value for 'end'
 *      endsAfter: // value for 'endsAfter'
 *      endsBefore: // value for 'endsBefore'
 *      inLanguage: // value for 'inLanguage'
 *      include: // value for 'include'
 *      isFree: // value for 'isFree'
 *      keyword: // value for 'keyword'
 *      keywordAnd: // value for 'keywordAnd'
 *      keywordOrSet1: // value for 'keywordOrSet1'
 *      keywordOrSet2: // value for 'keywordOrSet2'
 *      keywordOrSet3: // value for 'keywordOrSet3'
 *      keywordNot: // value for 'keywordNot'
 *      language: // value for 'language'
 *      localOngoingAnd: // value for 'localOngoingAnd'
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
export function useEventListQuery(baseOptions?: Apollo.QueryHookOptions<EventListQuery, EventListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventListQuery, EventListQueryVariables>(EventListDocument, options);
      }
export function useEventListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventListQuery, EventListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventListQuery, EventListQueryVariables>(EventListDocument, options);
        }
export type EventListQueryHookResult = ReturnType<typeof useEventListQuery>;
export type EventListLazyQueryHookResult = ReturnType<typeof useEventListLazyQuery>;
export type EventListQueryResult = Apollo.QueryResult<EventListQuery, EventListQueryVariables>;
export const EventsByIdsDocument = gql`
    query EventsByIds($ids: [ID!]!, $eventType: [EventTypeId], $include: [String], $sort: String, $pageSize: Int, $page: Int, $start: String, $end: String) {
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
    ${EventFieldsFragmentDoc}`;

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
 *      eventType: // value for 'eventType'
 *      include: // value for 'include'
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useEventsByIdsQuery(baseOptions: Apollo.QueryHookOptions<EventsByIdsQuery, EventsByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(EventsByIdsDocument, options);
      }
export function useEventsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsByIdsQuery, EventsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsByIdsQuery, EventsByIdsQueryVariables>(EventsByIdsDocument, options);
        }
export type EventsByIdsQueryHookResult = ReturnType<typeof useEventsByIdsQuery>;
export type EventsByIdsLazyQueryHookResult = ReturnType<typeof useEventsByIdsLazyQuery>;
export type EventsByIdsQueryResult = Apollo.QueryResult<EventsByIdsQuery, EventsByIdsQueryVariables>;
export const KeywordDetailsDocument = gql`
    query KeywordDetails($id: ID!) {
  keywordDetails(id: $id) {
    ...keywordFields
  }
}
    ${KeywordFieldsFragmentDoc}`;

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
export function useKeywordDetailsQuery(baseOptions: Apollo.QueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, options);
      }
export function useKeywordDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, options);
        }
export type KeywordDetailsQueryHookResult = ReturnType<typeof useKeywordDetailsQuery>;
export type KeywordDetailsLazyQueryHookResult = ReturnType<typeof useKeywordDetailsLazyQuery>;
export type KeywordDetailsQueryResult = Apollo.QueryResult<KeywordDetailsQuery, KeywordDetailsQueryVariables>;
export const KeywordListDocument = gql`
    query KeywordList($dataSource: String, $hasUpcomingEvents: Boolean, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String) {
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
    ${KeywordFieldsFragmentDoc}`;

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
 *   },
 * });
 */
export function useKeywordListQuery(baseOptions?: Apollo.QueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, options);
      }
export function useKeywordListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, options);
        }
export type KeywordListQueryHookResult = ReturnType<typeof useKeywordListQuery>;
export type KeywordListLazyQueryHookResult = ReturnType<typeof useKeywordListLazyQuery>;
export type KeywordListQueryResult = Apollo.QueryResult<KeywordListQuery, KeywordListQueryVariables>;
export const LandingPageDocument = gql`
    query LandingPage($draft: Boolean, $id: ID!) {
  landingPage(draft: $draft, id: $id) {
    ...landingPageFields
  }
}
    ${LandingPageFieldsFragmentDoc}`;

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
export function useLandingPageQuery(baseOptions: Apollo.QueryHookOptions<LandingPageQuery, LandingPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingPageQuery, LandingPageQueryVariables>(LandingPageDocument, options);
      }
export function useLandingPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingPageQuery, LandingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingPageQuery, LandingPageQueryVariables>(LandingPageDocument, options);
        }
export type LandingPageQueryHookResult = ReturnType<typeof useLandingPageQuery>;
export type LandingPageLazyQueryHookResult = ReturnType<typeof useLandingPageLazyQuery>;
export type LandingPageQueryResult = Apollo.QueryResult<LandingPageQuery, LandingPageQueryVariables>;
export const LandingPagesDocument = gql`
    query LandingPages($visibleOnFrontpage: Boolean) {
  landingPages(visibleOnFrontpage: $visibleOnFrontpage) {
    data {
      ...landingPageFields
    }
  }
}
    ${LandingPageFieldsFragmentDoc}`;

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
export function useLandingPagesQuery(baseOptions?: Apollo.QueryHookOptions<LandingPagesQuery, LandingPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingPagesQuery, LandingPagesQueryVariables>(LandingPagesDocument, options);
      }
export function useLandingPagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingPagesQuery, LandingPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingPagesQuery, LandingPagesQueryVariables>(LandingPagesDocument, options);
        }
export type LandingPagesQueryHookResult = ReturnType<typeof useLandingPagesQuery>;
export type LandingPagesLazyQueryHookResult = ReturnType<typeof useLandingPagesLazyQuery>;
export type LandingPagesQueryResult = Apollo.QueryResult<LandingPagesQuery, LandingPagesQueryVariables>;
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
export function useNeighborhoodListQuery(baseOptions?: Apollo.QueryHookOptions<NeighborhoodListQuery, NeighborhoodListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NeighborhoodListQuery, NeighborhoodListQueryVariables>(NeighborhoodListDocument, options);
      }
export function useNeighborhoodListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NeighborhoodListQuery, NeighborhoodListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NeighborhoodListQuery, NeighborhoodListQueryVariables>(NeighborhoodListDocument, options);
        }
export type NeighborhoodListQueryHookResult = ReturnType<typeof useNeighborhoodListQuery>;
export type NeighborhoodListLazyQueryHookResult = ReturnType<typeof useNeighborhoodListLazyQuery>;
export type NeighborhoodListQueryResult = Apollo.QueryResult<NeighborhoodListQuery, NeighborhoodListQueryVariables>;
export const OrganizationDetailsDocument = gql`
    query OrganizationDetails($id: ID!) {
  organizationDetails(id: $id) {
    ...organizationFields
  }
}
    ${OrganizationFieldsFragmentDoc}`;

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
export function useOrganizationDetailsQuery(baseOptions: Apollo.QueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, options);
      }
export function useOrganizationDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>(OrganizationDetailsDocument, options);
        }
export type OrganizationDetailsQueryHookResult = ReturnType<typeof useOrganizationDetailsQuery>;
export type OrganizationDetailsLazyQueryHookResult = ReturnType<typeof useOrganizationDetailsLazyQuery>;
export type OrganizationDetailsQueryResult = Apollo.QueryResult<OrganizationDetailsQuery, OrganizationDetailsQueryVariables>;
export const PlaceDetailsDocument = gql`
    query PlaceDetails($id: ID!) {
  placeDetails(id: $id) {
    ...placeFields
  }
}
    ${PlaceFieldsFragmentDoc}`;

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
 *   },
 * });
 */
export function usePlaceDetailsQuery(baseOptions: Apollo.QueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, options);
      }
export function usePlaceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, options);
        }
export type PlaceDetailsQueryHookResult = ReturnType<typeof usePlaceDetailsQuery>;
export type PlaceDetailsLazyQueryHookResult = ReturnType<typeof usePlaceDetailsLazyQuery>;
export type PlaceDetailsQueryResult = Apollo.QueryResult<PlaceDetailsQuery, PlaceDetailsQueryVariables>;
export const PlaceListDocument = gql`
    query PlaceList($dataSource: String, $divisions: [String], $hasUpcomingEvents: Boolean, $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String) {
  placeList(
    dataSource: $dataSource
    divisions: $divisions
    hasUpcomingEvents: $hasUpcomingEvents
    page: $page
    pageSize: $pageSize
    showAllPlaces: $showAllPlaces
    sort: $sort
    text: $text
  ) {
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
 *   },
 * });
 */
export function usePlaceListQuery(baseOptions?: Apollo.QueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, options);
      }
export function usePlaceListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, options);
        }
export type PlaceListQueryHookResult = ReturnType<typeof usePlaceListQuery>;
export type PlaceListLazyQueryHookResult = ReturnType<typeof usePlaceListLazyQuery>;
export type PlaceListQueryResult = Apollo.QueryResult<PlaceListQuery, PlaceListQueryVariables>;