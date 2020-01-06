import { shallow } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";

import MobileNavbar from "../MobileNavbar";

it("MobileNavbar matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <MobileNavbar
        isMenuOpen={true}
        onCloseMenu={() => {}}
        onOpenMenu={() => {}}
      />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
