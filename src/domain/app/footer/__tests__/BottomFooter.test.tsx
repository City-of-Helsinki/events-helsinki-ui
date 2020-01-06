import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import BottomFooter from "../BottomFooter";

test("BottomFooter matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <BottomFooter />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
