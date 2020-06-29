import { MockedProvider } from "@apollo/react-testing";
import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import wait from "waait";

import { EventsByIdsDocument } from "../../../../generated/graphql";
import mockEvent from "../../../event/__mocks__/eventDetails";
import { getEventIdFromUrl } from "../../../event/EventUtils";
import { mockCollection } from "../../constants";
import CuratedEventList from "../CuratedEventList";

const mocks = [
  {
    request: {
      query: EventsByIdsDocument,
      variables: {
        ids: mockCollection.collectionDetails.curatedEvents
          .map(url => getEventIdFromUrl(url) || "")
          .filter(e => e),
        include: ["keywords", "location"]
      }
    },
    result: {
      data: { eventsByIds: [mockEvent] }
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

test("CuratedEventList should match snapshot", async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CuratedEventList collectionData={mockCollection} />
        </MemoryRouter>
      </MockedProvider>,
      container
    );

    await wait(0); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
