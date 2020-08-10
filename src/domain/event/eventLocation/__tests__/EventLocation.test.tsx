import { mount } from 'enzyme';
import * as React from 'react';

import mockEvent from '../../__mocks__/eventDetails';
import EventLocation from '../EventLocation';

// React-leaflet renders over 11000 lines of html, so no snapshot for this component
describe('<EventLocation /> rendering', () => {
  it('should render 1 mapLink and 2 directionsLink', () => {
    const wrapper = mount(<EventLocation event={mockEvent} />);

    expect(wrapper.find('.mapLink')).toHaveLength(1);
    expect(wrapper.find('.directionsLink')).toHaveLength(2);
  });

  it('should render event name', () => {
    const wrapper = mount(<EventLocation event={mockEvent} />);

    expect(wrapper.text()).toContain('name fi');
  });

  it('should render location address', () => {
    const wrapper = mount(<EventLocation event={mockEvent} />);

    expect(wrapper.text()).toContain('streetAddress fi, locality fi');
  });
});

export {};
