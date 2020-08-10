import pretty from 'pretty';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import wait from 'waait';

import mockEvent from '../../../event/__mocks__/eventDetails';
import EventCards from '../EventCards';

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

test('EventCards should match snapshot', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <EventCards events={[mockEvent]} />
      </MemoryRouter>,
      container
    );

    await wait(0); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
