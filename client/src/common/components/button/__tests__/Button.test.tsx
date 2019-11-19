import * as React from "react";
import renderer from "react-test-renderer";

import Button from "../Button";

test("Button matches snapshot", () => {
  const component = renderer.create(
    <Button color="primary" size="md">
      Test
    </Button>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
