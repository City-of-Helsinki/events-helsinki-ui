import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import get from "lodash/get";

export default function createClient(uri: string) {
  const customFetch = (batchUri: string, options: RequestInit) => {
    // TODO: Inject authentication token to requests when Tunnistamo is added
    return fetch(uri, options);
  };

  const link = ApolloLink.from([
    createPersistedQueryLink(),
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
