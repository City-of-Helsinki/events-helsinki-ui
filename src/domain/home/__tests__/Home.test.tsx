import { MockedProvider } from "@apollo/react-testing";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router";

import Home from "../Home";

test("Home matches snapshot", () => {
  const tree = mount(
    <MockedProvider mocks={[]}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(tree.html()).toMatchSnapshot();
});

export {};
