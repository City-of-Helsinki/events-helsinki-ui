import { shallow } from "enzyme";
import React from "react";
import routeData, { MemoryRouter } from "react-router";

import MobileNavigationMenu from "../MobileNavigationMenu";

const mockLocation = {
  hash: "",
  pathname: "/fi/home",
  search: "",
  state: ""
};
beforeEach(() => {
  jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
});

it("MobileNavigationMenu matches snapshot", () => {
  const container = shallow(
    <MemoryRouter>
      <MobileNavigationMenu isMenuOpen={true} onMenuClose={() => {}} />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
