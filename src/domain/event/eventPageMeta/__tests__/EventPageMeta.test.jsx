import { render, waitForDomChange } from "@testing-library/react";
import React from "react";

import EventPageMeta from "../EventPageMeta";

const getWrapper = props => render(<EventPageMeta {...props} />);

// Rendering EventPageMeta creates a side effect--the document head will be
// mutated. This mutation will persist between tests. This can be problematic:
// (1) other test suites asserting against `document.head` may receive
//     unexpected initial conditions
// (2) this test suite may receive unexpected initial conditions if
//     `EventPageMeta` is rendered as part of some other test suite (likely)
// To combat these conditions, we are manually managing the `head` in setup and
// teardown.
let initialHeadInnerHTML = null;

beforeEach(() => {
  const head = document.querySelector("head");
  initialHeadInnerHTML = head.innerHTML;

  document.head.innerHTML = "";
});

afterEach(() => {
  document.head.innerHTML = initialHeadInnerHTML;
});

test("applies expected metadata", async () => {
  const eventName = "Name of event";
  const eventDescription = "Description for event";
  const eventImage = "https://localhost/example/path";
  const mockEventData = {
    eventDetails: {
      images: [{ url: eventImage }],
      shortDescription: {
        fi: eventDescription
      },
      name: {
        fi: eventName
      }
    }
  };

  // This function is usually used for the helpers it returns. However, the
  // scope f the helpers is limited to `body`. As we need to assert against
  // the content of the `head`, we have to make queries without helpers. We are
  // using testing library to render for consistency.
  getWrapper({ eventData: mockEventData });

  await waitForDomChange();

  const title = document.title;
  const head = document.querySelector("head");
  const metaDescription = head.querySelector('[name="description"]');
  const ogTitle = head.querySelector('[property="og:title"]');
  const ogDescription = head.querySelector('[property="og:description"]');
  const ogImage = head.querySelector('[property="og:image"]');

  expect(title).toEqual(eventName);
  expect(metaDescription).toHaveAttribute("content", eventDescription);
  expect(ogTitle).toHaveAttribute("content", eventName);
  expect(ogDescription).toHaveAttribute("content", eventDescription);
  expect(ogImage).toHaveAttribute("content", eventImage);
});
