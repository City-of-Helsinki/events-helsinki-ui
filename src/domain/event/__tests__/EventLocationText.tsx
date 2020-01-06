import * as React from "react";
import renderer from "react-test-renderer";

import { mockEventData } from "../constants";
import EventLocationText from "../EventLocationText";

test("EventLocationText matches snapshot", () => {
  const component = renderer.create(
    <EventLocationText
      event={mockEventData.eventDetails}
      showDistrict={true}
      showLocationName={true}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
