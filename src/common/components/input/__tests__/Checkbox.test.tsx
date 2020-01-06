import * as React from "react";
import renderer from "react-test-renderer";

import Checkbox from "../Checkbox";

test("Checkbox matches snapshot", () => {
  const component = renderer.create(
    <Checkbox checked={true} className="test-class-name">
      Test
    </Checkbox>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
