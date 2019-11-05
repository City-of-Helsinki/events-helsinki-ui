import * as React from "react";
import renderer from "react-test-renderer";

import Category from "../Category";

test("Category matches snapshot", () => {
  const component = renderer.create(
    <Category
      category={{ text: "foo", value: "bar" }}
      onRemove={category => {
        // eslint-disable-next-line no-console
        console.log(category);
      }}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
