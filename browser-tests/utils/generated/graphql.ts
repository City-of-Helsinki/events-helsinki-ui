import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
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
  courseListQuery?: Maybe<LocalizedObject>;
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
  extensionCourse?: Maybe<ExtensionCourse>;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  meta: Meta;
  data: Array<EventDetails>;
};

export type ExtensionCourse = {
  __typename?: 'ExtensionCourse';
  enrolmentStartTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
};

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

export enum LinkedEventsSource {
  Linkedevents = 'LINKEDEVENTS',
  Linkedcourses = 'LINKEDCOURSES',
}

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
  eventList: EventListResponse;
  eventsByIds: Array<EventDetails>;
  courseDetails: EventDetails;
  courseList: EventListResponse;
  coursesByIds: Array<EventDetails>;
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

export type QueryEventListArgs = {
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
  audienceMinAgeLt?: Maybe<Scalars['String']>;
  audienceMinAgeGt?: Maybe<Scalars['String']>;
  audienceMaxAgeLt?: Maybe<Scalars['String']>;
  audienceMaxAgeGt?: Maybe<Scalars['String']>;
};

export type QueryEventsByIdsArgs = {
  ids: Array<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryCourseDetailsArgs = {
  id?: Maybe<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryCourseListArgs = {
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
  audienceMinAgeLt?: Maybe<Scalars['String']>;
  audienceMinAgeGt?: Maybe<Scalars['String']>;
  audienceMaxAgeLt?: Maybe<Scalars['String']>;
  audienceMaxAgeGt?: Maybe<Scalars['String']>;
};

export type QueryCoursesByIdsArgs = {
  ids: Array<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryKeywordDetailsArgs = {
  id: Scalars['ID'];
  source?: Maybe<LinkedEventsSource>;
};

export type QueryKeywordListArgs = {
  dataSource?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  source?: Maybe<LinkedEventsSource>;
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
  source?: Maybe<LinkedEventsSource>;
};

export type QueryPlaceDetailsArgs = {
  id: Scalars['ID'];
  source?: Maybe<LinkedEventsSource>;
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
  source?: Maybe<LinkedEventsSource>;
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

export type LocalizedCmsKeywordsFragment = {
  __typename?: 'LocalizedCmsKeywords';
} & Pick<LocalizedCmsKeywords, 'en' | 'fi' | 'sv'>;

export type StaticPageFieldsFragment = { __typename?: 'StaticPage' } & Pick<
  StaticPage,
  'id' | 'expired'
> & {
    headingSection: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    contentSection: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    keywords: Maybe<
      { __typename?: 'LocalizedCmsKeywords' } & LocalizedCmsKeywordsFragment
    >;
  };

export type AboutPagesQueryVariables = {};

export type AboutPagesQuery = { __typename?: 'Query' } & {
  aboutPages: { __typename?: 'AboutPagesResponse' } & {
    data: Array<{ __typename?: 'StaticPage' } & StaticPageFieldsFragment>;
  };
};

export type AccessibilityPagesQueryVariables = {};

export type AccessibilityPagesQuery = { __typename?: 'Query' } & {
  accessibilityPages: { __typename?: 'AccessibilityPagesResponse' } & {
    data: Array<{ __typename?: 'StaticPage' } & StaticPageFieldsFragment>;
  };
};

export type CollectionFieldsFragment = {
  __typename?: 'CollectionDetails';
} & Pick<
  CollectionDetails,
  'id' | 'boxColor' | 'curatedEvents' | 'expired' | 'live' | 'slug'
> & {
    heroImage: Maybe<{ __typename?: 'CmsImage' } & CmsImageFieldsFragment>;
    curatedEventsTitle: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    description: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    eventListQuery: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    eventListTitle: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    keywords: Maybe<
      { __typename?: 'LocalizedCmsKeywords' } & LocalizedCmsKeywordsFragment
    >;
    linkText: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    linkUrl: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    socialMediaDescription: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    title: { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment;
  };

export type CollectionDetailsQueryVariables = {
  draft?: Maybe<Scalars['Boolean']>;
  slug: Scalars['ID'];
};

export type CollectionDetailsQuery = { __typename?: 'Query' } & {
  collectionDetails: {
    __typename?: 'CollectionDetails';
  } & CollectionFieldsFragment;
};

export type CollectionListQueryVariables = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};

export type CollectionListQuery = { __typename?: 'Query' } & {
  collectionList: { __typename?: 'CollectionListResponse' } & {
    data: Array<
      { __typename?: 'CollectionDetails' } & CollectionFieldsFragment
    >;
  };
};

export type CourseFieldsFragment = { __typename?: 'EventDetails' } & {
  extensionCourse: Maybe<
    { __typename?: 'ExtensionCourse' } & Pick<
      ExtensionCourse,
      | 'enrolmentStartTime'
      | 'enrolmentEndTime'
      | 'maximumAttendeeCapacity'
      | 'minimumAttendeeCapacity'
      | 'remainingAttendeeCapacity'
    >
  >;
} & EventFieldsFragment;

export type CourseDetailsQueryVariables = {
  id: Scalars['ID'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CourseDetailsQuery = { __typename?: 'Query' } & {
  courseDetails: { __typename?: 'EventDetails' } & CourseFieldsFragment;
};

export type CourseListQueryVariables = {
  allOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  audienceMaxAgeLt?: Maybe<Scalars['String']>;
  audienceMinAgeGt?: Maybe<Scalars['String']>;
  division?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  endsAfter?: Maybe<Scalars['String']>;
  endsBefore?: Maybe<Scalars['String']>;
  inLanguage?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  isFree?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet2?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet3?: Maybe<Array<Maybe<Scalars['String']>>>;
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
};

export type CourseListQuery = { __typename?: 'Query' } & {
  courseList: { __typename?: 'EventListResponse' } & {
    meta: { __typename?: 'Meta' } & Pick<Meta, 'count' | 'next' | 'previous'>;
    data: Array<{ __typename?: 'EventDetails' } & CourseFieldsFragment>;
  };
};

export type CoursesByIdsQueryVariables = {
  ids: Array<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CoursesByIdsQuery = { __typename?: 'Query' } & {
  coursesByIds: Array<{ __typename?: 'EventDetails' } & CourseFieldsFragment>;
};

export type LocalizedFieldsFragment = { __typename?: 'LocalizedObject' } & Pick<
  LocalizedObject,
  'en' | 'fi' | 'sv'
>;

export type OfferFieldsFragment = { __typename?: 'Offer' } & Pick<
  Offer,
  'isFree'
> & {
    price: Maybe<{ __typename?: 'LocalizedObject' } & LocalizedFieldsFragment>;
    description: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    infoUrl: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
  };

export type EventFieldsFragment = { __typename?: 'EventDetails' } & Pick<
  EventDetails,
  'id' | 'eventStatus' | 'endTime' | 'startTime' | 'publisher'
> & {
    externalLinks: Array<
      { __typename?: 'ExternalLink' } & Pick<ExternalLink, 'name' | 'link'>
    >;
    images: Array<
      { __typename?: 'Image' } & Pick<Image, 'id' | 'name' | 'url'>
    >;
    superEvent: Maybe<
      { __typename?: 'InternalIdObject' } & Pick<InternalIdObject, 'internalId'>
    >;
    inLanguage: Array<
      { __typename?: 'InLanguage' } & {
        name: Maybe<
          { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
        >;
      }
    >;
    keywords: Array<{ __typename?: 'Keyword' } & KeywordFieldsFragment>;
    location: Maybe<{ __typename?: 'Place' } & PlaceFieldsFragment>;
    offers: Array<{ __typename?: 'Offer' } & OfferFieldsFragment>;
    name: { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment;
    description: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    shortDescription: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    provider: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    infoUrl: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    audience: Array<
      { __typename?: 'Audience' } & Pick<Audience, 'id'> & {
          name: Maybe<
            { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
          >;
        }
    >;
  };

export type EventDetailsQueryVariables = {
  id: Scalars['ID'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EventDetailsQuery = { __typename?: 'Query' } & {
  eventDetails: { __typename?: 'EventDetails' } & EventFieldsFragment;
};

export type EventListQueryVariables = {
  allOngoing?: Maybe<Scalars['Boolean']>;
  allOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  division?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  endsAfter?: Maybe<Scalars['String']>;
  endsBefore?: Maybe<Scalars['String']>;
  inLanguage?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  isFree?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordOrSet1?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  localOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
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
};

export type EventListQuery = { __typename?: 'Query' } & {
  eventList: { __typename?: 'EventListResponse' } & {
    meta: { __typename?: 'Meta' } & Pick<Meta, 'count' | 'next' | 'previous'>;
    data: Array<{ __typename?: 'EventDetails' } & EventFieldsFragment>;
  };
};

export type EventsByIdsQueryVariables = {
  ids: Array<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EventsByIdsQuery = { __typename?: 'Query' } & {
  eventsByIds: Array<{ __typename?: 'EventDetails' } & EventFieldsFragment>;
};

export type KeywordFieldsFragment = { __typename?: 'Keyword' } & Pick<
  Keyword,
  'id' | 'internalId' | 'dataSource' | 'hasUpcomingEvents'
> & {
    name: Maybe<
      { __typename?: 'LocalizedObject' } & Pick<
        LocalizedObject,
        'fi' | 'sv' | 'en'
      >
    >;
  };

export type KeywordDetailsQueryVariables = {
  id: Scalars['ID'];
};

export type KeywordDetailsQuery = { __typename?: 'Query' } & {
  keywordDetails: { __typename?: 'Keyword' } & KeywordFieldsFragment;
};

export type KeywordListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  source?: Maybe<LinkedEventsSource>;
};

export type KeywordListQuery = { __typename?: 'Query' } & {
  keywordList: { __typename?: 'KeywordListResponse' } & {
    meta: { __typename?: 'Meta' } & Pick<Meta, 'count' | 'next' | 'previous'>;
    data: Array<{ __typename?: 'Keyword' } & KeywordFieldsFragment>;
  };
};

export type CmsImageFieldsFragment = { __typename?: 'CmsImage' } & Pick<
  CmsImage,
  'url'
> & {
    photographerCredit: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
  };

export type LocalizedCmsImageFieldsFragment = {
  __typename?: 'LocalizedCmsImage';
} & {
  en: Maybe<{ __typename?: 'CmsImage' } & CmsImageFieldsFragment>;
  fi: Maybe<{ __typename?: 'CmsImage' } & CmsImageFieldsFragment>;
  sv: Maybe<{ __typename?: 'CmsImage' } & CmsImageFieldsFragment>;
};

export type LandingPageFieldsFragment = { __typename?: 'LandingPage' } & Pick<
  LandingPage,
  'id'
> & {
    pageTitle: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    metaInformation: Maybe<
      { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
    >;
    keywords: Maybe<
      { __typename?: 'LocalizedCmsKeywords' } & LocalizedCmsKeywordsFragment
    >;
    topBanner: Maybe<{ __typename?: 'BannerPage' } & BannerPageFieldsFragment>;
    bottomBanner: Maybe<
      { __typename?: 'BannerPage' } & BannerPageFieldsFragment
    >;
  };

export type BannerPageFieldsFragment = { __typename?: 'BannerPage' } & {
  title: Maybe<{ __typename?: 'LocalizedObject' } & LocalizedFieldsFragment>;
  description: Maybe<
    { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
  >;
  keywords: Maybe<
    { __typename?: 'LocalizedCmsKeywords' } & LocalizedCmsKeywordsFragment
  >;
  titleAndDescriptionColor: Maybe<
    { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
  >;
  buttonText: Maybe<
    { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
  >;
  buttonUrl: Maybe<
    { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
  >;
  heroBackgroundImage: Maybe<
    { __typename?: 'LocalizedCmsImage' } & LocalizedCmsImageFieldsFragment
  >;
  heroBackgroundImageColor: Maybe<
    { __typename?: 'LocalizedObject' } & LocalizedFieldsFragment
  >;
  heroBackgroundImageMobile: Maybe<
    { __typename?: 'LocalizedCmsImage' } & LocalizedCmsImageFieldsFragment
  >;
  heroTopLayerImage: Maybe<
    { __typename?: 'LocalizedCmsImage' } & LocalizedCmsImageFieldsFragment
  >;
  socialMediaImage: Maybe<
    { __typename?: 'LocalizedCmsImage' } & LocalizedCmsImageFieldsFragment
  >;
};

export type LandingPageQueryVariables = {
  draft?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type LandingPageQuery = { __typename?: 'Query' } & {
  landingPage: { __typename?: 'LandingPage' } & LandingPageFieldsFragment;
};

export type LandingPagesQueryVariables = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};

export type LandingPagesQuery = { __typename?: 'Query' } & {
  landingPages: { __typename?: 'LandingPagesResponse' } & {
    data: Array<{ __typename?: 'LandingPage' } & LandingPageFieldsFragment>;
  };
};

export type NeighborhoodListQueryVariables = {};

export type NeighborhoodListQuery = { __typename?: 'Query' } & {
  neighborhoodList: { __typename?: 'NeighborhoodListResponse' } & {
    meta: { __typename?: 'Meta' } & Pick<Meta, 'count' | 'next' | 'previous'>;
    data: Array<
      { __typename?: 'Neighborhood' } & Pick<Neighborhood, 'id'> & {
          name: { __typename?: 'LocalizedObject' } & Pick<
            LocalizedObject,
            'fi' | 'sv' | 'en'
          >;
        }
    >;
  };
};

export type OrganizationFieldsFragment = {
  __typename?: 'OrganizationDetails';
} & Pick<OrganizationDetails, 'id' | 'name'>;

export type OrganizationDetailsQueryVariables = {
  id: Scalars['ID'];
};

export type OrganizationDetailsQuery = { __typename?: 'Query' } & {
  organizationDetails: {
    __typename?: 'OrganizationDetails';
  } & OrganizationFieldsFragment;
};

export type PlaceFieldsFragment = { __typename?: 'Place' } & Pick<
  Place,
  'id' | 'hasUpcomingEvents' | 'internalId' | 'email' | 'postalCode'
> & {
    divisions: Maybe<
      Array<
        { __typename?: 'Division' } & Pick<Division, 'type'> & {
            name: Maybe<
              { __typename?: 'LocalizedObject' } & Pick<
                LocalizedObject,
                'fi' | 'sv' | 'en'
              >
            >;
          }
      >
    >;
    infoUrl: Maybe<
      { __typename?: 'LocalizedObject' } & Pick<
        LocalizedObject,
        'fi' | 'sv' | 'en'
      >
    >;
    name: Maybe<
      { __typename?: 'LocalizedObject' } & Pick<
        LocalizedObject,
        'fi' | 'en' | 'sv'
      >
    >;
    addressLocality: Maybe<
      { __typename?: 'LocalizedObject' } & Pick<
        LocalizedObject,
        'fi' | 'sv' | 'en'
      >
    >;
    streetAddress: Maybe<
      { __typename?: 'LocalizedObject' } & Pick<
        LocalizedObject,
        'fi' | 'sv' | 'en'
      >
    >;
    position: Maybe<
      { __typename?: 'PlacePosition' } & Pick<PlacePosition, 'coordinates'>
    >;
    telephone: Maybe<
      { __typename?: 'LocalizedObject' } & Pick<
        LocalizedObject,
        'fi' | 'sv' | 'en'
      >
    >;
  };

export type PlaceDetailsQueryVariables = {
  id: Scalars['ID'];
  source?: Maybe<LinkedEventsSource>;
};

export type PlaceDetailsQuery = { __typename?: 'Query' } & {
  placeDetails: { __typename?: 'Place' } & PlaceFieldsFragment;
};

export type PlaceListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  hasUpcomingEvents?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  source?: Maybe<LinkedEventsSource>;
};

export type PlaceListQuery = { __typename?: 'Query' } & {
  placeList: { __typename?: 'PlaceListResponse' } & {
    meta: { __typename?: 'Meta' } & Pick<Meta, 'count' | 'next' | 'previous'>;
    data: Array<{ __typename?: 'Place' } & PlaceFieldsFragment>;
  };
};

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
  ${LocalizedCmsKeywordsFragmentDoc}
`;
export const CmsImageFieldsFragmentDoc = gql`
  fragment cmsImageFields on CmsImage {
    photographerCredit {
      ...localizedFields
    }
    url
  }
  ${LocalizedFieldsFragmentDoc}
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
  ${LocalizedCmsKeywordsFragmentDoc}
`;
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
  ${LocalizedFieldsFragmentDoc}
`;
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
  ${OfferFieldsFragmentDoc}
`;
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
  ${EventFieldsFragmentDoc}
`;
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
  ${CmsImageFieldsFragmentDoc}
`;
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
  ${LocalizedCmsImageFieldsFragmentDoc}
`;
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
  ${BannerPageFieldsFragmentDoc}
`;
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
  ${StaticPageFieldsFragmentDoc}
`;
export const AccessibilityPagesDocument = gql`
  query AccessibilityPages {
    accessibilityPages {
      data {
        ...staticPageFields
      }
    }
  }
  ${StaticPageFieldsFragmentDoc}
`;
export const CollectionDetailsDocument = gql`
  query CollectionDetails($draft: Boolean, $slug: ID!) {
    collectionDetails(draft: $draft, slug: $slug) {
      ...collectionFields
    }
  }
  ${CollectionFieldsFragmentDoc}
`;
export const CollectionListDocument = gql`
  query CollectionList($visibleOnFrontpage: Boolean) {
    collectionList(visibleOnFrontpage: $visibleOnFrontpage) {
      data {
        ...collectionFields
      }
    }
  }
  ${CollectionFieldsFragmentDoc}
`;
export const CourseDetailsDocument = gql`
  query CourseDetails($id: ID!, $include: [String]) {
    courseDetails(id: $id, include: $include) {
      ...courseFields
    }
  }
  ${CourseFieldsFragmentDoc}
`;
export const CourseListDocument = gql`
  query CourseList(
    $allOngoingAnd: [String]
    $audienceMaxAgeLt: String
    $audienceMinAgeGt: String
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
    $keywordOrSet2: [String]
    $keywordOrSet3: [String]
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
      audienceMaxAgeLt: $audienceMaxAgeLt
      audienceMinAgeGt: $audienceMinAgeGt
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
      keywordOrSet2: $keywordOrSet2
      keywordOrSet3: $keywordOrSet3
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
  ${CourseFieldsFragmentDoc}
`;
export const CoursesByIdsDocument = gql`
  query CoursesByIds($ids: [ID!]!, $include: [String]) {
    coursesByIds(ids: $ids, include: $include) {
      ...courseFields
    }
  }
  ${CourseFieldsFragmentDoc}
`;
export const EventDetailsDocument = gql`
  query EventDetails($id: ID!, $include: [String]) {
    eventDetails(id: $id, include: $include) {
      ...eventFields
    }
  }
  ${EventFieldsFragmentDoc}
`;
export const EventListDocument = gql`
  query EventList(
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
  ${EventFieldsFragmentDoc}
`;
export const EventsByIdsDocument = gql`
  query EventsByIds($ids: [ID!]!, $include: [String]) {
    eventsByIds(ids: $ids, include: $include) {
      ...eventFields
    }
  }
  ${EventFieldsFragmentDoc}
`;
export const KeywordDetailsDocument = gql`
  query KeywordDetails($id: ID!) {
    keywordDetails(id: $id) {
      ...keywordFields
    }
  }
  ${KeywordFieldsFragmentDoc}
`;
export const KeywordListDocument = gql`
  query KeywordList(
    $dataSource: String
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllKeywords: Boolean
    $sort: String
    $text: String
    $source: LinkedEventsSource
  ) {
    keywordList(
      dataSource: $dataSource
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllKeywords: $showAllKeywords
      sort: $sort
      text: $text
      source: $source
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
  ${KeywordFieldsFragmentDoc}
`;
export const LandingPageDocument = gql`
  query LandingPage($draft: Boolean, $id: ID!) {
    landingPage(draft: $draft, id: $id) {
      ...landingPageFields
    }
  }
  ${LandingPageFieldsFragmentDoc}
`;
export const LandingPagesDocument = gql`
  query LandingPages($visibleOnFrontpage: Boolean) {
    landingPages(visibleOnFrontpage: $visibleOnFrontpage) {
      data {
        ...landingPageFields
      }
    }
  }
  ${LandingPageFieldsFragmentDoc}
`;
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
export const OrganizationDetailsDocument = gql`
  query OrganizationDetails($id: ID!) {
    organizationDetails(id: $id) {
      ...organizationFields
    }
  }
  ${OrganizationFieldsFragmentDoc}
`;
export const PlaceDetailsDocument = gql`
  query PlaceDetails($id: ID!, $source: LinkedEventsSource) {
    placeDetails(id: $id, source: $source) {
      ...placeFields
    }
  }
  ${PlaceFieldsFragmentDoc}
`;
export const PlaceListDocument = gql`
  query PlaceList(
    $dataSource: String
    $divisions: [String]
    $hasUpcomingEvents: Boolean
    $page: Int
    $pageSize: Int
    $showAllPlaces: Boolean
    $sort: String
    $text: String
    $source: LinkedEventsSource
  ) {
    placeList(
      dataSource: $dataSource
      divisions: $divisions
      hasUpcomingEvents: $hasUpcomingEvents
      page: $page
      pageSize: $pageSize
      showAllPlaces: $showAllPlaces
      sort: $sort
      text: $text
      source: $source
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
  ${PlaceFieldsFragmentDoc}
`;
export function getSdk(client: GraphQLClient) {
  return {
    AboutPages(variables?: AboutPagesQueryVariables): Promise<AboutPagesQuery> {
      return client.request<AboutPagesQuery>(
        print(AboutPagesDocument),
        variables
      );
    },
    AccessibilityPages(
      variables?: AccessibilityPagesQueryVariables
    ): Promise<AccessibilityPagesQuery> {
      return client.request<AccessibilityPagesQuery>(
        print(AccessibilityPagesDocument),
        variables
      );
    },
    CollectionDetails(
      variables: CollectionDetailsQueryVariables
    ): Promise<CollectionDetailsQuery> {
      return client.request<CollectionDetailsQuery>(
        print(CollectionDetailsDocument),
        variables
      );
    },
    CollectionList(
      variables?: CollectionListQueryVariables
    ): Promise<CollectionListQuery> {
      return client.request<CollectionListQuery>(
        print(CollectionListDocument),
        variables
      );
    },
    CourseDetails(
      variables: CourseDetailsQueryVariables
    ): Promise<CourseDetailsQuery> {
      return client.request<CourseDetailsQuery>(
        print(CourseDetailsDocument),
        variables
      );
    },
    CourseList(variables?: CourseListQueryVariables): Promise<CourseListQuery> {
      return client.request<CourseListQuery>(
        print(CourseListDocument),
        variables
      );
    },
    CoursesByIds(
      variables: CoursesByIdsQueryVariables
    ): Promise<CoursesByIdsQuery> {
      return client.request<CoursesByIdsQuery>(
        print(CoursesByIdsDocument),
        variables
      );
    },
    EventDetails(
      variables: EventDetailsQueryVariables
    ): Promise<EventDetailsQuery> {
      return client.request<EventDetailsQuery>(
        print(EventDetailsDocument),
        variables
      );
    },
    EventList(variables?: EventListQueryVariables): Promise<EventListQuery> {
      return client.request<EventListQuery>(
        print(EventListDocument),
        variables
      );
    },
    EventsByIds(
      variables: EventsByIdsQueryVariables
    ): Promise<EventsByIdsQuery> {
      return client.request<EventsByIdsQuery>(
        print(EventsByIdsDocument),
        variables
      );
    },
    KeywordDetails(
      variables: KeywordDetailsQueryVariables
    ): Promise<KeywordDetailsQuery> {
      return client.request<KeywordDetailsQuery>(
        print(KeywordDetailsDocument),
        variables
      );
    },
    KeywordList(
      variables?: KeywordListQueryVariables
    ): Promise<KeywordListQuery> {
      return client.request<KeywordListQuery>(
        print(KeywordListDocument),
        variables
      );
    },
    LandingPage(
      variables: LandingPageQueryVariables
    ): Promise<LandingPageQuery> {
      return client.request<LandingPageQuery>(
        print(LandingPageDocument),
        variables
      );
    },
    LandingPages(
      variables?: LandingPagesQueryVariables
    ): Promise<LandingPagesQuery> {
      return client.request<LandingPagesQuery>(
        print(LandingPagesDocument),
        variables
      );
    },
    NeighborhoodList(
      variables?: NeighborhoodListQueryVariables
    ): Promise<NeighborhoodListQuery> {
      return client.request<NeighborhoodListQuery>(
        print(NeighborhoodListDocument),
        variables
      );
    },
    OrganizationDetails(
      variables: OrganizationDetailsQueryVariables
    ): Promise<OrganizationDetailsQuery> {
      return client.request<OrganizationDetailsQuery>(
        print(OrganizationDetailsDocument),
        variables
      );
    },
    PlaceDetails(
      variables: PlaceDetailsQueryVariables
    ): Promise<PlaceDetailsQuery> {
      return client.request<PlaceDetailsQuery>(
        print(PlaceDetailsDocument),
        variables
      );
    },
    PlaceList(variables?: PlaceListQueryVariables): Promise<PlaceListQuery> {
      return client.request<PlaceListQuery>(
        print(PlaceListDocument),
        variables
      );
    },
  };
}
