import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";

import Link from "../Link";

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

it("Link should be internal link", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Link to="www.test.fi">
          <div>Test internal link</div>
        </Link>
      </MemoryRouter>,

      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<a class=\\"link defaultColor defaultSize\\" href=\\"/www.test.fi\\">
      <div>Test internal link</div><svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"100%\\" height=\\"100%\\" viewBox=\\"0 0 199.404 199.404\\" class=\\"\\">
        <g>
          <polygon points=\\"63.993,199.404 163.695,99.702 63.993,0 35.709,28.285 107.127,99.702 35.709,171.119  \\"></polygon>
        </g>
      </svg>
    </a>"
  `);
});

it("Link should be external link", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Link isExternal={true} to="www.test.fi">
          <div>Test external link</div>
        </Link>
      </MemoryRouter>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<a class=\\"link defaultColor defaultSize\\" href=\\"www.test.fi\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">
      <div>Test external link</div><svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"100%\\" height=\\"100%\\" viewBox=\\"0 0 199.404 199.404\\" class=\\"\\">
        <g>
          <polygon points=\\"63.993,199.404 163.695,99.702 63.993,0 35.709,28.285 107.127,99.702 35.709,171.119  \\"></polygon>
        </g>
      </svg>
    </a>"
  `);
});
