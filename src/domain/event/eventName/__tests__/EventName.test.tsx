import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { EVENT_STATUS } from "../../../../constants";
import { mockEventData } from "../../constants";
import EventName from "../EventName";

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

describe("EventName component", () => {
  test("should render event name of scheduled event", async () => {
    act(() => {
      render(
        <EventName event={{ ...mockEventData.eventDetails }} />,
        container
      );
    });

    if (container) {
      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`"name fi"`);
    }
  });

  test("should render event name of cancelled event", async () => {
    act(() => {
      render(
        <EventName
          event={{
            ...mockEventData.eventDetails,
            eventStatus: EVENT_STATUS.EVENT_CANCELLED
          }}
        />,
        container
      );
    });

    if (container) {
      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
        `"<span class=\\"eventCancelled\\">Tapahtuma peruttu: </span>name fi"`
      );
    }
  });
});
