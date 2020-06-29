import * as React from "react";
import renderer from "react-test-renderer";

import mockEvent from "../../__mocks__/eventDetails";
import EventLocationText from "../EventLocationText";

test("EventLocationText matches snapshot", () => {
  const component = renderer.create(
    <EventLocationText
      event={mockEvent}
      showDistrict={true}
      showLocationName={true}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
