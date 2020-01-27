import { MockedProvider } from "@apollo/react-testing";
import pretty from "pretty";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import wait from "waait";

import { EventDetailsDocument } from "../../../../generated/graphql";
import { mockEventData } from "../../../event/constants";
import EventCard from "../EventCard";

const mocks = [
  {
    request: {
      query: EventDetailsDocument,
      variables: {
        id: mockEventData.eventDetails.id
      }
    },
    result: {
      data: mockEventData
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
          <EventCard eventId={mockEventData.eventDetails.id} />
        </MemoryRouter>
      </MockedProvider>,
      container
    );

    await wait(0); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
