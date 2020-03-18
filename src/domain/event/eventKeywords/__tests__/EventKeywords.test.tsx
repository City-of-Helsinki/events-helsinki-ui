import * as React from "react";
import renderer from "react-test-renderer";

import { mockEventData } from "../../constants";
import EventKeywords from "../EventKeywords";

test("EventKeywords matches snapshot", () => {
  const component = renderer.create(
    <EventKeywords event={mockEventData.eventDetails} showIsFree={true} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
