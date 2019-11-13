import * as React from "react";
import renderer from "react-test-renderer";

import AutosuggestMenu from "../AutosuggestMenu";

test("AutosuggestMenu matches snapshot", () => {
  const component = renderer.create(
    <AutosuggestMenu
      items={[{ text: "foo", type: "bar" }]}
      isOpen={true}
      onClose={() => {}}
      onItemClick={() => {}}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
