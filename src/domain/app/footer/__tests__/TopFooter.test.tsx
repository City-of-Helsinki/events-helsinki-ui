import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import TopFooter from "../TopFooter";

test("TopFooter matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <TopFooter />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
