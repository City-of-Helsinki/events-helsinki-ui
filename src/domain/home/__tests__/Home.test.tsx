import { MockedProvider } from "@apollo/react-testing";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router";

import { CollectionListDocument } from "../../../generated/graphql";
import Home from "../Home";

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

test("Home matches snapshot", () => {
  const tree = mount(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(tree.html()).toMatchSnapshot();
});

export {};
