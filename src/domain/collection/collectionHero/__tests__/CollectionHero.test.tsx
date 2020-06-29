import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import wait from "waait";

import mockCollection from "../../__mocks__/collection";
import CollectionHero from "../CollectionHero";

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

test("CollectionHero should match snapshot", async () => {
  await act(async () => {
    render(<CollectionHero collection={mockCollection} />, container);

    await wait(0); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
