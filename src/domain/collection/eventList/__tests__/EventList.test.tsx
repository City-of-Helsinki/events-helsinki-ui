import { MockedProvider } from "@apollo/react-testing";
import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import wait from "waait";

import { SUPPORT_LANGUAGES } from "../../../../constants";
import { EventListDocument } from "../../../../generated/graphql";
import { mockEventData } from "../../../event/constants";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "../../../eventSearch/constants";
import { getEventFilters } from "../../../eventSearch/EventListUtils";
import { mockCollection } from "../../constants";
import EventList from "../EventList";

window.scrollTo = jest.fn();

const searchParams = new URLSearchParams(
  mockCollection.collectionDetails.eventListQuery
);
const mocks = [
  {
    request: {
      query: EventListDocument,
      variables: getEventFilters(
        searchParams,
        PAGE_SIZE,
        EVENT_SORT_OPTIONS.END_TIME,
        SUPPORT_LANGUAGES.FI
      )
    },
    result: {
      data: {
        eventList: {
          data: [mockEventData.eventDetails],
          meta: {
            count: 1,
            next: null,
            previous: null
          }
        }
      }
    }
  }
];

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
          <EventList collectionData={mockCollection} />
        </MemoryRouter>
      </MockedProvider>,
      container
    );

    await wait(0); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
