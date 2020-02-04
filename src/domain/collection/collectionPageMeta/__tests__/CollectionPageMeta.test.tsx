import { render, waitForDomChange } from "@testing-library/react";
import React from "react";

import { mockCollection } from "../../constants";
import CollectionPageMeta, {
  CollectionPageMetaProps
} from "../CollectionPageMeta";

const getWrapper = (props: CollectionPageMetaProps) =>
  render(<CollectionPageMeta {...props} />);

// Rendering CollectionPageMeta creates a side effect--the document head will be
// mutated. This mutation will persist between tests. This can be problematic:
// (1) other test suites asserting against `document.head` may receive
//     unexpected initial conditions
// (2) this test suite may receive unexpected initial conditions if
//     `CollectionPageMeta` is rendered as part of some other test suite (likely)
// To combat these conditions, we are manually managing the `head` in setup and
// teardown.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initialHeadInnerHTML: any = null;

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const head: any = document.querySelector("head");
  initialHeadInnerHTML = head.innerHTML;

  document.head.innerHTML = "";
});

afterEach(() => {
  document.head.innerHTML = initialHeadInnerHTML;
});

test("applies expected metadata", async () => {
  const collectionTitle = mockCollection.collectionDetails.title.fi;
  const collectionDescription =
    mockCollection.collectionDetails.shortDescription.fi;

  // This function is usually used for the helpers it returns. However, the
  // scope f the helpers is limited to `body`. As we need to assert against
  // the content of the `head`, we have to make queries without helpers. We are
  // using testing library to render for consistency.
  getWrapper({ collectionData: mockCollection });

  await waitForDomChange();

  const title = document.title;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const head: any = document.querySelector("head");
  const metaDescription = head.querySelector('[name="description"]');
  const ogTitle = head.querySelector('[property="og:title"]');
  const ogDescription = head.querySelector('[property="og:description"]');
  // TODO: Test also image url when implemented

  expect(title).toEqual(collectionTitle);
  expect(metaDescription).toHaveAttribute("content", collectionDescription);
  expect(ogTitle).toHaveAttribute("content", collectionTitle);
  expect(ogDescription).toHaveAttribute("content", collectionDescription);
});
