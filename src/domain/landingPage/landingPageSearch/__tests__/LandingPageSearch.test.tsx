import { MockedProvider } from "@apollo/react-testing";
import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import LandingPageSearch from "../LandingPageSearch";

test("LandingPageSearch matches snapshot", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <MemoryRouter>
        <LandingPageSearch />
      </MemoryRouter>
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
