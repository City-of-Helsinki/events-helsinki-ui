import { shallow } from "enzyme";
import React from "react";
import routeData, { MemoryRouter } from "react-router";

import { mockEventData } from "../../../../domain/event/constants";
import EventCard from "../EventCard";

const mockLocation = {
  hash: "",
  pathname: "/fi/home",
  search: "",
  state: ""
};
beforeEach(() => {
  jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
});

it("EventCard matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <EventCard event={mockEventData.eventDetails} />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
