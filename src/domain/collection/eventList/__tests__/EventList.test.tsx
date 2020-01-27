import { MockedProvider } from "@apollo/react-testing";
import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { EventListDocument } from "../../../../generated/graphql";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "../../../eventSearch/constants";
import { getEventFilters } from "../../../eventSearch/EventListUtils";
import EventList from "../EventList";

const eventListQuery =
  "http://localhost:3000/en/events?categories=music&districts=kaupunginosa%3Aetu-t%C3%B6%C3%B6l%C3%B6";

const searchParams = new URLSearchParams(eventListQuery);
const mocks = [
  {
    request: {
      query: EventListDocument,
      variables: getEventFilters(
        searchParams,
        PAGE_SIZE,
        EVENT_SORT_OPTIONS.END_TIME
      )
    },
    result: {
      data: {
        eventList: {
          data: [{ id: "1", name: { fi: "Test" } }],
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

const collectionData = {
  collectionDetails: {
    eventListQuery,
    eventListTitle: {
      en: "All the best events of the fall",
      fi: "Kaikki syksyn parhaat tapahtumat",
      sv: "Höstens bästa händelser"
    },
    id: "1"
  }
};

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

test("EventList should match snapshot", () => {
  act(() => {
    render(
      <MockedProvider mocks={mocks}>
        <EventList collectionData={collectionData} />
      </MockedProvider>,
      container
    );
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"eventList\\">
      <div class=\\"container\\">
        <h2>Kaikki syksyn parhaat tapahtumat</h2>
        <div class=\\"spinnerWrapper\\">
          <div class=\\"spinner\\">
            <div></div>
          </div>
        </div>
      </div>
    </div>"
  `);
});
