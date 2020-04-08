import * as React from "react";
import renderer from "react-test-renderer";

import TextWithLineBreaks from "../TextWithLineBreaks";

test("TextWithLineBreaks matches snapshot", () => {
  const text = `Line 1
  Line 2`;
  const component = renderer.create(
    <TextWithLineBreaks as="div" text={text} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
