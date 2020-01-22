import { shallow } from "enzyme";
import React from "react";

import MobileNavigationMenu from "../MobileNavigationMenu";

it("MobileNavigationMenu matches snapshot", () => {
  const container = shallow(
    <MobileNavigationMenu isMenuOpen={true} onMenuClose={() => {}} />
  );
  expect(container.html()).toMatchSnapshot();
});
