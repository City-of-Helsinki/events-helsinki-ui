import * as Sentry from "@sentry/browser";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import get from "lodash/get";

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      placeDetails: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: "Place", id: args.id });
      }
    }
  }
}).restore(get(window, "__APOLLO_STATE__"));

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_BASE_URL
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const errorMessage = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
      Sentry.captureMessage(errorMessage);
    });
  }

  if (networkError) {
    Sentry.captureMessage("Network error");
  }
});

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, httpLink])
});

export default apolloClient;
