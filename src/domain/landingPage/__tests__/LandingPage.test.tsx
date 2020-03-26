import { MockedProvider } from "@apollo/react-testing";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router";

import { CollectionListDocument } from "../../../generated/graphql";
import LandingPage from "../LandingPage";

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

test("LandingPage matches snapshot", () => {
  const tree = mount(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(tree.html()).toMatchSnapshot();
});

export {};
