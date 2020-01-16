import { MockedProvider } from "@apollo/react-testing";
import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import Home from "../Home";

test("Home matches snapshot", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
