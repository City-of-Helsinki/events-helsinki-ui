import pretty from 'pretty';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import SrOnly from '../SrOnly';

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

it('SrOnly component type should be div', () => {
  act(() => {
    render(
      <SrOnly className="test">
        <div>Test</div>
      </SrOnly>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"srOnly test\\">
      <div>Test</div>
    </div>"
  `);
});

it('SrOnly component type should be span', () => {
  act(() => {
    render(
      <SrOnly as="span">
        <div>Test</div>
      </SrOnly>,
      container
    );
  });
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<span class=\\"srOnly\\"><div>Test</div></span>"`
  );
});
