import * as Sentry from "@sentry/browser";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { onError } from "apollo-link-error";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import get from "lodash/get";

export default function createClient(uri: string) {
  const customFetch = (batchUri: string, options: RequestInit) => {
    // TODO: Inject authentication token to requests when Tunnistamo is added
    return fetch(uri, options);
  };

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

  const link = ApolloLink.from([
    createPersistedQueryLink(),
    errorLink,
    new BatchHttpLink({
      batchMax: 1,
      fetch: customFetch
    })
  ]);

  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: true
    }).restore(get(window, "__APOLLO_STATE__")),
    link
  });
}
