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

export type CollectionDetails = {
   __typename?: 'CollectionDetails',
  id: Scalars['ID'],
  contentType?: Maybe<Scalars['Int']>,
  curatedEvents: Array<Scalars['String']>,
  curatedEventsTitle: LocalizedObject,
  depth?: Maybe<Scalars['Int']>,
  description: LocalizedObject,
  draftTitle?: Maybe<Scalars['String']>,
  eventListQuery?: Maybe<Scalars['String']>,
  eventListTitle: LocalizedObject,
  expireAt?: Maybe<Scalars['String']>,
  expired?: Maybe<Scalars['Boolean']>,
  firstPublishedAt?: Maybe<Scalars['String']>,
  goLiveAt?: Maybe<Scalars['String']>,
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>,
  lastPublishedAt?: Maybe<Scalars['String']>,
  latestRevisionCreatedAt?: Maybe<Scalars['String']>,
  linkText: LocalizedObject,
  linkUrl: LocalizedObject,
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
  similarCollectionsTitle?: Maybe<LocalizedObject>,
  slug?: Maybe<Scalars['String']>,
  socialMediaDescription?: Maybe<LocalizedObject>,
  subtitles: LocalizedObject,
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
  extensionCourse?: Maybe<ExtensionCourse>,
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
  id?: Maybe<Scalars['String']>,
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdTime?: Maybe<Scalars['String']>,
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

export type Offer = {
   __typename?: 'Offer',
  isFree?: Maybe<Scalars['Boolean']>,
  description?: Maybe<LocalizedObject>,
  price?: Maybe<LocalizedObject>,
  infoUrl?: Maybe<LocalizedObject>,
};

export type OrganizationDetails = {
   __typename?: 'OrganizationDetails',
  id: Scalars['ID'],
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
  internalId?: Maybe<Scalars['String']>,
  internalContext?: Maybe<Scalars['String']>,
  internalType?: Maybe<Scalars['String']>,
};

export type Place = {
   __typename?: 'Place',
  id?: Maybe<Scalars['ID']>,
  divisions?: Maybe<Array<Division>>,
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
  internalId?: Maybe<Scalars['String']>,
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
  collectionDetails: CollectionDetails,
  collectionList: CollectionListResponse,
  eventDetails: EventDetails,
  eventList: EventListResponse,
  keywordDetails: Keyword,
  keywordList: KeywordListResponse,
  organizationDetails: OrganizationDetails,
  placeDetails: Place,
  placeList: PlaceListResponse,
};


export type QueryCollectionDetailsArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type QueryEventListArgs = {
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>,
  endDate?: Maybe<Scalars['String']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>,
  inLanguage?: Maybe<Scalars['String']>,
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>,
  language?: Maybe<Scalars['String']>,
  locations?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  publisher?: Maybe<Scalars['ID']>,
  sort?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
  superEvent?: Maybe<Scalars['ID']>,
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>,
  text?: Maybe<Scalars['String']>,
  translation?: Maybe<Scalars['String']>
};


export type QueryKeywordDetailsArgs = {
  id: Scalars['ID']
};


export type QueryKeywordListArgs = {
  dataSource?: Maybe<Scalars['String']>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllKeywords?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>
};


export type QueryOrganizationDetailsArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryPlaceDetailsArgs = {
  id: Scalars['ID']
};


export type QueryPlaceListArgs = {
  dataSource?: Maybe<Scalars['String']>,
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllPlaces?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>
};

export type Subscription = {
   __typename?: 'Subscription',
  _empty?: Maybe<Scalars['String']>,
};

export type CollectionDetailsQueryVariables = {
  id: Scalars['ID']
};


export type CollectionDetailsQuery = (
  { __typename?: 'Query' }
  & { collectionDetails: (
    { __typename?: 'CollectionDetails' }
    & Pick<CollectionDetails, 'id' | 'curatedEvents' | 'eventListQuery'>
    & { curatedEventsTitle: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    ), description: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    ), eventListTitle: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    ), linkText: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    ), linkUrl: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    ), socialMediaDescription: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    )>, similarCollectionsTitle: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    )>, subtitles: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    ), title: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
    ) }
  ) }
);

export type CollectionListQueryVariables = {};


export type CollectionListQuery = (
  { __typename?: 'Query' }
  & { collectionList: (
    { __typename?: 'CollectionListResponse' }
    & { data: Array<(
      { __typename?: 'CollectionDetails' }
      & Pick<CollectionDetails, 'id' | 'curatedEvents' | 'eventListQuery'>
      & { curatedEventsTitle: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      ), description: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      ), eventListTitle: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      ), linkText: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      ), linkUrl: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      ), similarCollectionsTitle: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      )>, socialMediaDescription: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      )>, subtitles: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      ), title: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'en' | 'fi' | 'sv'>
      ) }
    )> }
  ) }
);

export type EventDetailsQueryVariables = {
  id: Scalars['ID'],
  include?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type EventDetailsQuery = (
  { __typename?: 'Query' }
  & { eventDetails: (
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
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )>, keywords: Array<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, 'id' | 'altLabels' | 'createdTime' | 'lastModifiedTime' | 'nEvents' | 'dataSource'>
      & { name: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )>, location: Maybe<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'email' | 'postalCode'>
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
    )>, offers: Array<(
      { __typename?: 'Offer' }
      & Pick<Offer, 'isFree'>
      & { price: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, description: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, infoUrl: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )>, name: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    ), description: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    )>, shortDescription: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    )>, provider: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )>, infoUrl: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  ) }
);

export type OrganizationDetailsQueryVariables = {
  id: Scalars['ID']
};


export type OrganizationDetailsQuery = (
  { __typename?: 'Query' }
  & { organizationDetails: (
    { __typename?: 'OrganizationDetails' }
    & Pick<OrganizationDetails, 'id' | 'name'>
  ) }
);

export type EventListQueryVariables = {
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>,
  endDate?: Maybe<Scalars['String']>,
  include?: Maybe<Array<Maybe<Scalars['String']>>>,
  inLanguage?: Maybe<Scalars['String']>,
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>,
  language?: Maybe<Scalars['String']>,
  locations?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  publisher?: Maybe<Scalars['ID']>,
  sort?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
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
      & Pick<EventDetails, 'id' | 'eventStatus' | 'startTime' | 'endTime'>
      & { images: Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'name' | 'url'>
      )>, keywords: Array<(
        { __typename?: 'Keyword' }
        & Pick<Keyword, 'id'>
        & { name: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )> }
      )>, location: Maybe<(
        { __typename?: 'Place' }
        & Pick<Place, 'id'>
        & { divisions: Maybe<Array<(
          { __typename?: 'Division' }
          & Pick<Division, 'type'>
          & { name: Maybe<(
            { __typename?: 'LocalizedObject' }
            & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
          )> }
        )>>, name: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
        )>, addressLocality: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )>, streetAddress: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )> }
      )>, name: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
      ), offers: Array<(
        { __typename?: 'Offer' }
        & Pick<Offer, 'isFree'>
        & { description: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )>, price: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )>, infoUrl: Maybe<(
          { __typename?: 'LocalizedObject' }
          & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
        )> }
      )> }
    )> }
  ) }
);

export type KeywordDetailsQueryVariables = {
  id: Scalars['ID']
};


export type KeywordDetailsQuery = (
  { __typename?: 'Query' }
  & { keywordDetails: (
    { __typename?: 'Keyword' }
    & Pick<Keyword, 'id'>
    & { name: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  ) }
);

export type KeywordListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllKeywords?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>
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
      & Pick<Keyword, 'id'>
      & { name: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  ) }
);

export type PlaceDetailsQueryVariables = {
  id: Scalars['ID']
};


export type PlaceDetailsQuery = (
  { __typename?: 'Query' }
  & { placeDetails: (
    { __typename?: 'Place' }
    & Pick<Place, 'id'>
    & { name: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  ) }
);

export type PlaceListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>,
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>,
  page?: Maybe<Scalars['Int']>,
  pageSize?: Maybe<Scalars['Int']>,
  showAllPlaces?: Maybe<Scalars['Boolean']>,
  sort?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>
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
      & Pick<Place, 'id'>
      & { name: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  ) }
);


export const CollectionDetailsDocument = gql`
    query CollectionDetails($id: ID!) {
  collectionDetails(id: $id) {
    id
    curatedEvents
    curatedEventsTitle {
      en
      fi
      sv
    }
    description {
      en
      fi
      sv
    }
    eventListQuery
    eventListTitle {
      en
      fi
      sv
    }
    linkText {
      en
      fi
      sv
    }
    linkUrl {
      en
      fi
      sv
    }
    socialMediaDescription {
      en
      fi
      sv
    }
    similarCollectionsTitle {
      en
      fi
      sv
    }
    subtitles {
      en
      fi
      sv
    }
    title {
      en
      fi
      sv
    }
  }
}
    `;
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
 *      id: // value for 'id'
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
    query CollectionList {
  collectionList {
    data {
      id
      curatedEvents
      curatedEventsTitle {
        en
        fi
        sv
      }
      description {
        en
        fi
        sv
      }
      eventListQuery
      eventListTitle {
        en
        fi
        sv
      }
      linkText {
        en
        fi
        sv
      }
      linkUrl {
        en
        fi
        sv
      }
      similarCollectionsTitle {
        en
        fi
        sv
      }
      socialMediaDescription {
        en
        fi
        sv
      }
      subtitles {
        en
        fi
        sv
      }
      title {
        en
        fi
        sv
      }
    }
  }
}
    `;
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
export const EventDetailsDocument = gql`
    query EventDetails($id: ID!, $include: [String]) {
  eventDetails(id: $id, include: $include) {
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
        fi
        sv
        en
      }
    }
    keywords {
      id
      altLabels
      createdTime
      lastModifiedTime
      nEvents
      dataSource
      name {
        fi
        sv
        en
      }
    }
    location {
      id
      divisions {
        type
        name {
          fi
          sv
          en
        }
      }
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
    offers {
      isFree
      price {
        fi
        sv
        en
      }
      description {
        fi
        sv
        en
      }
      infoUrl {
        fi
        sv
        en
      }
    }
    name {
      fi
      en
      sv
    }
    description {
      fi
      en
      sv
    }
    shortDescription {
      fi
      en
      sv
    }
    endTime
    startTime
    publisher
    provider {
      fi
      sv
      en
    }
    infoUrl {
      fi
      sv
      en
    }
  }
}
    `;
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
export const OrganizationDetailsDocument = gql`
    query OrganizationDetails($id: ID!) {
  organizationDetails(id: $id) {
    id
    name
  }
}
    `;
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
export const EventListDocument = gql`
    query EventList($divisions: [String], $endDate: String, $include: [String], $inLanguage: String, $keywords: [String], $language: String, $locations: [String], $page: Int, $pageSize: Int, $publisher: ID, $sort: String, $startDate: String, $superEvent: ID, $superEventType: [String], $text: String, $translation: String) {
  eventList(divisions: $divisions, endDate: $endDate, include: $include, inLanguage: $inLanguage, keywords: $keywords, language: $language, locations: $locations, page: $page, pageSize: $pageSize, publisher: $publisher, sort: $sort, startDate: $startDate, superEvent: $superEvent, superEventType: $superEventType, text: $text, translation: $translation) {
    meta {
      count
      next
      previous
    }
    data {
      id
      eventStatus
      images {
        id
        name
        url
      }
      keywords {
        id
        name {
          fi
          sv
          en
        }
      }
      location {
        id
        divisions {
          type
          name {
            fi
            en
            sv
          }
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
      }
      name {
        fi
        en
        sv
      }
      offers {
        isFree
        description {
          fi
          sv
          en
        }
        price {
          fi
          sv
          en
        }
        infoUrl {
          fi
          sv
          en
        }
      }
      startTime
      endTime
    }
  }
}
    `;
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
 *      divisions: // value for 'divisions'
 *      endDate: // value for 'endDate'
 *      include: // value for 'include'
 *      inLanguage: // value for 'inLanguage'
 *      keywords: // value for 'keywords'
 *      language: // value for 'language'
 *      locations: // value for 'locations'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      publisher: // value for 'publisher'
 *      sort: // value for 'sort'
 *      startDate: // value for 'startDate'
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
export const KeywordDetailsDocument = gql`
    query KeywordDetails($id: ID!) {
  keywordDetails(id: $id) {
    id
    name {
      fi
      sv
      en
    }
  }
}
    `;
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
    query KeywordList($dataSource: String, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String) {
  keywordList(dataSource: $dataSource, page: $page, pageSize: $pageSize, showAllKeywords: $showAllKeywords, sort: $sort, text: $text) {
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
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllKeywords: // value for 'showAllKeywords'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
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
export const PlaceDetailsDocument = gql`
    query PlaceDetails($id: ID!) {
  placeDetails(id: $id) {
    id
    name {
      fi
      sv
      en
    }
  }
}
    `;
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
    query PlaceList($dataSource: String, $divisions: [String], $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String) {
  placeList(dataSource: $dataSource, divisions: $divisions, page: $page, pageSize: $pageSize, showAllPlaces: $showAllPlaces, sort: $sort, text: $text) {
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
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllPlaces: // value for 'showAllPlaces'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
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