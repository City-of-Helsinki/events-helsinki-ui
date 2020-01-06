import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import { mockEventData } from "../constants";
import EventHero from "../EventHero";

test("EventHero matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <EventHero eventData={mockEventData} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
