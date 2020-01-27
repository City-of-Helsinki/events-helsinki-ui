import { MockedProvider } from "@apollo/react-testing";
import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import wait from "waait";

import { EventListDocument } from "../../../../generated/graphql";
import { mockEventData } from "../../../event/constants";
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from "../../../eventSearch/constants";
import { getEventFilters } from "../../../eventSearch/EventListUtils";
import EventList from "../EventList";

window.scrollTo = jest.fn();

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

const collectionData = {
  collectionDetails: {
    curatedEvents: [
      "http://localhost:3000/fi/event/helsinki:afxh3naida?id=123",
      "http://localhost:3000/fi/event/helsinki:afxrsql3xa",
      "http://localhost:3000/fi/event/helsinki:afxh3namhe",
      "http://localhost:3000/fi/event/helsinki:afxpj6bxbu",
      "http://localhost:3000/fi/event/helsinki:afx5msunhu"
    ],
    curatedEventsTitle: {
      en: "At least visit these",
      fi: "Käy ainakin näissä",
      sv: "Besök åtminstone dessa"
    },
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

test("EventList should match snapshot", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <EventList collectionData={collectionData} />
        </MemoryRouter>
      </MockedProvider>,
      container
    );

    await wait(0); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
