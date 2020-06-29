import { MockedProvider } from "@apollo/react-testing";
import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import wait from "waait";

import {
  CollectionListDocument,
  LandingPageDocument
} from "../../../generated/graphql";
import mockCollection from "../../collection/__mocks__/collection";
import { mockLandingPage } from "../constants";
import LandingPage from "../LandingPage";

const mocks = [
  {
    request: {
      query: CollectionListDocument,
      variables: { visibleOnFrontpage: true }
    },
    result: {
      data: {
        collectionList: {
          data: [mockCollection]
        }
      }
    }
  },
  {
    request: {
      query: LandingPageDocument,
      variables: { visibleOnFrontpage: true }
    },
    result: { data: { landingPage: { data: [mockLandingPage] } } }
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("CollectionHero should match snapshot", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </MockedProvider>,
      container
    );

    await wait(); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
