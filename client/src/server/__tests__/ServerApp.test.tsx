import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { MockLink } from "apollo-link-mock";
import * as React from "react";
import renderer from "react-test-renderer";

import ServerApp from "../ServerApp";

test("ServerApp matches snapshot", () => {
  function createClient() {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new MockLink([])
    });
  }

  const client = createClient();
  const component = renderer.create(
    <ServerApp client={client} context={{}} url="/fi/home" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
