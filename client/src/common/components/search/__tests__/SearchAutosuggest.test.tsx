import * as React from "react";
import renderer from "react-test-renderer";

import SearchAutosuggest from "../SearchAutosuggest";

test("SearchAutosuggest matches snapshot", () => {
  const component = renderer.create(
    <SearchAutosuggest
      categories={[{ text: "bar", value: "foo" }]}
      onRemoveCategory={category => {
        // eslint-disable-next-line no-console
        console.log(category);
      }}
      placeholder="Lorem ipsum"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
