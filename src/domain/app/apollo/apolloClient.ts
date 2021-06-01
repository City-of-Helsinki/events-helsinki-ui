import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import get from 'lodash/get';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        event(_, { args, toReference }) {
          return toReference({
            __typename: 'Keyword',
            id: args?.id,
          });
        },
        image(_, { args, toReference }) {
          return toReference({
            __typename: 'Place',
            id: args?.id,
          });
        },
      },
    },
  },
  // cacheRedirects: {
  //   Query: {
  //     keywordDetails: (_, args, { getCacheKey }) => {
  //       return getCacheKey({ __typename: 'Keyword', id: args.id });
  //     },
  //     placeDetails: (_, args, { getCacheKey }) => {
  //       return getCacheKey({ __typename: 'Place', id: args.id });
  //     },
  //   },
  // },
}).restore(get(window, '__APOLLO_STATE__'));

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_BASE_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const errorMessage = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
      Sentry.captureMessage(errorMessage);
    });
  }

  if (networkError) {
    Sentry.captureMessage('Network error');
  }
});

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, httpLink]),
});

export default apolloClient;
