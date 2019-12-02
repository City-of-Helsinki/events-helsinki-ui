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
  linkedCoursesEventDetails: LinkedCoursesEventDetails,
  linkedEventsEventDetails: LinkedEventsEventDetails,
};


export type QueryLinkedCoursesEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryLinkedEventsEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>
};

export type Subscription = {
   __typename?: 'Subscription',
  _empty?: Maybe<Scalars['String']>,
};

export type EventDetailsQueryVariables = {
  id: Scalars['ID']
};


export type EventDetailsQuery = (
  { __typename?: 'Query' }
  & { linkedEventsEventDetails: (
    { __typename?: 'LinkedEventsEventDetails' }
    & Pick<LinkedEventsEventDetails, 'id' | 'startTime'>
    & { images: Array<(
      { __typename?: 'LinkedEventsImage' }
      & Pick<LinkedEventsImage, 'id' | 'name' | 'url'>
    )>, keywords: Array<(
      { __typename?: 'LinkedEventsKeyword' }
      & Pick<LinkedEventsKeyword, 'id' | 'altLabels' | 'createdTime' | 'lastModifiedTime' | 'nEvents' | 'dataSource'>
      & { name: (
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      ) }
    )>, location: Maybe<(
      { __typename?: 'LinkedEventsLocation' }
      & { name: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
      )>, addressLocality: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, streetAddress: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )>, offers: Array<(
      { __typename?: 'LinkedEventsOffer' }
      & Pick<LinkedEventsOffer, 'isFree'>
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
    ), description: (
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    ), shortDescription: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'en' | 'sv'>
    )> }
  ) }
);


export const EventDetailsDocument = gql`
    query EventDetails($id: ID!) {
  linkedEventsEventDetails(id: $id) {
    id
    images {
      id
      name
      url
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
    startTime
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