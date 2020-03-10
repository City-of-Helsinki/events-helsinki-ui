import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { MockLink } from "apollo-link-mock";
import { mount } from "enzyme";
import * as React from "react";

import i18n from "../../common/translation/i18n/init.server";
import { CollectionListDocument } from "../../generated/graphql";
import ServerApp from "../ServerApp";

const mocks = [
  {
    request: {
      query: CollectionListDocument
    },
    result: {
      data: {
        collectionList: {
          results: {
            data: []
          }
        }
      }
    }
  }
];

test("ServerApp matches snapshot", () => {
  function createClient() {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new MockLink(mocks)
    });
  }

  const client = createClient();

  const tree = mount(
    <ServerApp client={client} context={{}} i18n={i18n} url="/fi/home" />
  );
  expect(tree.html()).toMatchSnapshot();
});

export {};
