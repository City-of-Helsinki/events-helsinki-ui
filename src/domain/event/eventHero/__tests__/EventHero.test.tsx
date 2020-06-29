import { render } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router";
import renderer from "react-test-renderer";

import mockEvent from "../../__mocks__/eventDetails";
import EventHero from "../EventHero";

test("EventHero matches snapshot", () => {
  const component = renderer.create(
    <MemoryRouter>
      <EventHero event={mockEvent} />
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
    ...mockEvent,
    offers: [
      {
        ...mockEvent.offers[0],
        infoUrl: "some-url",
        isFree: true
      }
    ]
  };
  const { queryByText } = getWrapper({ event: freeEventMockData });

  expect(queryByText("Osta lippu")).toEqual(null);
});

export {};
