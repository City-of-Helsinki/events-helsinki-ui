/* eslint-disable max-len */
import pretty from 'pretty';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';

import Link from '../Link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Link should be internal link', () => {
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
      <div>Test internal link</div><svg class=\\"Icon-module_icon__1Jtzj icon_hds-icon__1YqNC Icon-module_s__2WGWe icon_hds-icon--size-s__2Lkik\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\">
        <g fill=\\"none\\" fill-rule=\\"evenodd\\">
          <path d=\\"M0 24V0h24v24z\\"></path>
          <path fill=\\"currentColor\\" d=\\"M13 12.5l-5-5L9.5 6l6.5 6.5L9.5 19 8 17.5z\\"></path>
        </g>
      </svg>
    </a>"
  `);
});

it('Link should be external link', () => {
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
      <div>Test external link</div><svg class=\\"Icon-module_icon__1Jtzj icon_hds-icon__1YqNC Icon-module_s__2WGWe icon_hds-icon--size-s__2Lkik\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\">
        <g fill=\\"none\\" fill-rule=\\"evenodd\\">
          <path d=\\"M0 24V0h24v24z\\"></path>
          <path fill=\\"currentColor\\" d=\\"M13 12.5l-5-5L9.5 6l6.5 6.5L9.5 19 8 17.5z\\"></path>
        </g>
      </svg>
    </a>"
  `);
});
