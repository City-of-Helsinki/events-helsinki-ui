import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { mockEventData } from "../../constants";
import EventKeywords from "../EventKeywords";

it("EventKeywords matches snapshot", () => {
  const { container } = render(
    <MemoryRouter>
      <EventKeywords event={mockEventData.eventDetails} showIsFree={true} />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
