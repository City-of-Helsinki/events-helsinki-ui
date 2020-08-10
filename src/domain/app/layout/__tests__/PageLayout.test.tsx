import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import PageLayout from '../PageLayout';

it('PageLayout matched snapshot', () => {
  const layout = shallow(
    <MemoryRouter>
      <PageLayout>
        <></>
      </PageLayout>
    </MemoryRouter>
  );
  expect(layout.html()).toMatchSnapshot();
});
