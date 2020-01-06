import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import MobileNavigation from "../MobileNavigation";

it("MobileNavigation matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <MobileNavigation />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
