import * as React from "react";
import renderer from "react-test-renderer";

import Home from "../Home";

test("Home matches snapshot", () => {
  const component = renderer.create(<Home />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
