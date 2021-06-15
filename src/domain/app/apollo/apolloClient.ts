import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/browser';
import get from 'lodash/get';

export const cache = new InMemoryCache({
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
        eventList: {
          keyArgs: (args) =>
            args
              ? Object.keys(args).filter((key: string) => key !== 'page')
              : false,
          merge(existing, incoming) {
            return {
              data: [...(existing?.data ?? []), ...incoming.data],
              meta: incoming.meta,
            };
          },
        },
        // TODO: finish this when new eventsByIds pagination is merged
        // eventsByIds: {
        //   merge(
        //     existing: EventDetails[] | undefined,
        //     incoming: EventDetails[]
        //   ) {
        //     return [...(existing ?? []), ...incoming];
        //   },
        // },
      },
    },
  },
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
