import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import MobileHeader from "../MobileHeader";

it("MobileHeader matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <MobileHeader />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
