import { render, waitForDomChange } from "@testing-library/react";
import React from "react";

import mockLandingPage from "../../__mocks__/landingPage";
import LandingPageMeta from "../LandingPageMeta";

const getWrapper = () =>
  render(<LandingPageMeta landingPage={mockLandingPage} />);

// Rendering EventPageMeta creates a side effect--the document head will be
// mutated. This mutation will persist between tests. This can be problematic:
// (1) other test suites asserting against `document.head` may receive
//     unexpected initial conditions
// (2) this test suite may receive unexpected initial conditions if
//     `EventPageMeta` is rendered as part of some other test suite (likely)
// To combat these conditions, we are manually managing the `head` in setup and
// teardown.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initialHeadInnerHTML: any = null;

beforeEach(() => {
  const head = document.querySelector("head");
  initialHeadInnerHTML = head && head.innerHTML;

  document.head.innerHTML = "";
});

afterEach(() => {
  document.head.innerHTML = initialHeadInnerHTML;
});

test("applies expected metadata", async () => {
  const landingPageTitle =
    mockLandingPage.pageTitle && mockLandingPage.pageTitle.fi;
  const landingPageDescription =
    mockLandingPage.metaInformation && mockLandingPage.metaInformation.fi;
  const landingPageImage =
    mockLandingPage.socialMediaImage && mockLandingPage.socialMediaImage.fi;

  // This function is usually used for the helpers it returns. However, the
  // scope f the helpers is limited to `body`. As we need to assert against
  // the content of the `head`, we have to make queries without helpers. We are
  // using testing library to render for consistency.
  getWrapper();

  await waitForDomChange();

  const title = document.title;
  const head = document.querySelector("head");
  const metaDescription = head && head.querySelector('[name="description"]');
  const ogTitle = head && head.querySelector('[property="og:title"]');
  const ogDescription =
    head && head.querySelector('[property="og:description"]');
  const ogImage = head && head.querySelector('[property="og:image"]');

  expect(title).toEqual(landingPageTitle);
  expect(metaDescription).toHaveAttribute("content", landingPageDescription);
  expect(ogTitle).toHaveAttribute("content", landingPageTitle);
  expect(ogDescription).toHaveAttribute("content", landingPageDescription);
  expect(ogImage).toHaveAttribute("content", landingPageImage);
});
