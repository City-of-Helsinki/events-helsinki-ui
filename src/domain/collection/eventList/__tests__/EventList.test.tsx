import { MockedProvider } from "@apollo/react-testing";
import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import wait from "waait";

import mockCollection from "../../__mocks__/collection";
import { SUPPORT_LANGUAGES } from "../../../../constants";
import { EventListDocument } from "../../../../generated/graphql";
import mockEvent from "../../../event/__mocks__/eventDetails";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "../../../eventSearch/constants";
import { getEventFilters } from "../../../eventSearch/EventListUtils";
import EventList from "../EventList";

const searchParams = new URLSearchParams(
  new URL(mockCollection.eventListQuery || "").search
);
const mocks = [
  {
    request: {
      query: EventListDocument,
      variables: getEventFilters({
        include: ["keywords", "location"],
        language: SUPPORT_LANGUAGES.FI,
        pageSize: PAGE_SIZE,
        params: searchParams,
        sortOrder: EVENT_SORT_OPTIONS.END_TIME,
        superEventType: ["umbrella", "none"]
      })
    },
    result: {
      data: {
        eventList: {
          __typename: "EventListResponse",
          data: [mockEvent],
          meta: {
            __typename: "Meta",
            count: 1,
            next: null,
            previous: null
          }
        }
      }
    }
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("EventList should match snapshot", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <EventList collection={mockCollection} />
        </MemoryRouter>
      </MockedProvider>,
      container
    );

    await wait(0); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
