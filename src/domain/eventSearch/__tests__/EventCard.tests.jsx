import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import EventCard from "../EventCard";

const getWrapper = props =>
  render(
    <MemoryRouter>
      <EventCard {...props} />
    </MemoryRouter>
  );

test("should show buy button when event has an offer", () => {
  const mockEvent = {
    images: [],
    keywords: [],
    name: {},
    offers: [
      {
        infoUrl: {
          fi: "https://example.domain"
        }
      }
    ]
  };
  const { queryByText } = getWrapper({ event: mockEvent });

  expect(queryByText("Osta liput")).not.toEqual(null);
});

test("should hide buy button when event is free", () => {
  const mockEvent = {
    images: [],
    keywords: [],
    name: {},
    offers: [
      {
        infoUrl: {
          fi: "https://example.domain"
        },
        isFree: true
      }
    ]
  };
  const { queryByText } = getWrapper({ event: mockEvent });

  expect(queryByText("Osta liput")).toEqual(null);
});
