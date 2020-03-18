import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import { mockEventData } from "../../constants";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWrapper = (props: any) =>
  render(
    <MemoryRouter>
      <EventHero {...props} />
    </MemoryRouter>
  );

test("should hide buy button for free events", () => {
  const freeEventMockData = {
    ...mockEventData,
    eventDetails: {
      ...mockEventData.eventDetails,
      offers: [
        {
          ...mockEventData.eventDetails.offers[0],
          infoUrl: "some-url",
          isFree: true
        }
      ]
    }
  };
  const { queryByText } = getWrapper({ eventData: freeEventMockData });

  expect(queryByText("Osta lippu")).toEqual(null);
});

export {};
