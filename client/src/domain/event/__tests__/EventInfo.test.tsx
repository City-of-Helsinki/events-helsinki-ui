import * as React from "react";
import renderer from "react-test-renderer";

import { mockEventData } from "../constants";
import EventInfo from "../EventInfo";

test("EventInfo matches snapshot", () => {
  const component = renderer.create(<EventInfo eventData={mockEventData} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
