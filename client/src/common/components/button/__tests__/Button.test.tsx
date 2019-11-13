import * as React from "react";
import renderer from "react-test-renderer";

import Button, { ButtonStyles } from "../Button";

test("Button matches snapshot", () => {
  const component = renderer.create(
    <Button buttonStyle={ButtonStyles.MEDIUM_PRIMARY}>Test</Button>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
