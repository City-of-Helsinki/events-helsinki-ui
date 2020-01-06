import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import CollectionCardContainer from "../CollectionCardContainer";

test("CollectionCardContainer matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <CollectionCardContainer
        cards={[
          {
            count: 120,
            description: "Lorem ipsum 1",
            id: "1",
            title: "Title 1"
          },
          {
            count: 120,
            description: "Lorem ipsum 2",
            id: "2",
            title: "Title 2"
          }
        ]}
        size="lg"
      />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
